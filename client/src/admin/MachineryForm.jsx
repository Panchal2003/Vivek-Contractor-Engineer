import { useState } from "react";
import ImageCropModal from "./ImageCropModal";
import { X, Check } from "lucide-react";

const initialMachinery = {
  name: "",
  description: "",
  category: "General",
  image: "",
  imageFit: "cover",
  status: "available",
  order: 0,
};

export default function MachineryForm({ initialData = initialMachinery, onSubmit, onCancel, submitLabel = "Save Machinery" }) {
  const [image, setImage] = useState(initialData.image || "");
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [cropSource, setCropSource] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsReadingFile(true);
    const reader = new FileReader();
    reader.onload = () => {
      setCropSource(reader.result?.toString() || "");
      setIsReadingFile(false);
    };
    reader.onerror = () => setIsReadingFile(false);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await onSubmit({
      name: formData.get("name")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      category: formData.get("category")?.toString() || "General",
      image,
      imageFit: formData.get("imageFit")?.toString() || "cover",
      status: formData.get("status")?.toString() || "available",
      order: Number(formData.get("order") || 0),
    });
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100/50">
        <p className="text-sm font-medium text-slate-700">
          {initialData?._id ? "Update machinery details" : "Add equipment to your fleet"}
        </p>
        <p className="text-xs text-slate-500 mt-1">Upload equipment image and maintain inventory attributes.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="machine-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Equipment Name</label>
          <input id="machine-name" name="name" defaultValue={initialData.name} required placeholder="e.g., Excavator CAT 320" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" />
        </div>
        <div>
          <label htmlFor="machine-category" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Category</label>
          <input id="machine-category" name="category" defaultValue={initialData.category} placeholder="e.g., Heavy Machinery" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" />
        </div>
      </div>

      <div>
        <label htmlFor="machine-description" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Description</label>
        <textarea id="machine-description" name="description" defaultValue={initialData.description} rows={3} placeholder="Describe the equipment..." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="machine-image-file" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Equipment Image</label>
          <input id="machine-image-file" type="file" accept="image/*" onChange={handleFileChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-amber-500 file:to-orange-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white file:shadow-lg file:shadow-amber-500/25" />
          {isReadingFile && <p className="mt-1 text-xs text-amber-600">Reading image...</p>}
        </div>
        <div>
          <label htmlFor="machine-image-fit" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Image Display</label>
          <select id="machine-image-fit" name="imageFit" defaultValue={initialData.imageFit || "cover"} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all">
            <option value="cover">Crop to card</option>
            <option value="contain">Show complete</option>
          </select>
        </div>
        <div>
          <label htmlFor="machine-status" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Status</label>
          <select id="machine-status" name="status" defaultValue={initialData.status} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all">
            <option value="available">Available</option>
            <option value="in-use">In Use</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label htmlFor="machine-order" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Display Order</label>
          <input id="machine-order" name="order" type="number" defaultValue={initialData.order} placeholder="0" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" />
        </div>
      </div>

      {image && (
        <div className="relative rounded-xl overflow-hidden border border-slate-200">
          <img src={image} alt="Machinery preview" className="h-40 w-full object-cover" />
          <button 
            type="button" 
            onClick={() => setImage("")}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-500 hover:text-rose-500 shadow-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-emerald-500 text-white text-xs font-medium flex items-center gap-1">
            <Check className="h-3 w-3" /> Image Added
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <button 
          type="submit" 
          className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
          disabled={isReadingFile}
        >
          {submitLabel}
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
        >
          Cancel
        </button>
      </div>

      {cropSource ? (
        <ImageCropModal
          src={cropSource}
          onCancel={() => setCropSource("")}
          onApplyOriginal={() => {
            setImage(cropSource);
            setCropSource("");
          }}
          onApplyCropped={(croppedData) => {
            setImage(croppedData);
            setCropSource("");
          }}
        />
      ) : null}
    </form>
  );
}
