import { useState } from "react";
import ImageCropModal from "./ImageCropModal";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{initialData?._id ? "Edit Machinery" : "Create Machinery"}</h3>
        <p className="text-xs text-slate-400">Upload equipment image and maintain inventory attributes.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="machine-name" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Name</label>
          <input id="machine-name" name="name" defaultValue={initialData.name} required placeholder="Machine name" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" />
        </div>
        <div>
          <label htmlFor="machine-category" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Category</label>
          <input id="machine-category" name="category" defaultValue={initialData.category} placeholder="Category" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" />
        </div>
      </div>

      <div>
        <label htmlFor="machine-description" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Description</label>
        <textarea id="machine-description" name="description" defaultValue={initialData.description} rows={3} placeholder="Description" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="machine-image-file" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Machine Image</label>
          <input id="machine-image-file" type="file" accept="image/*" onChange={handleFileChange} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-cyan-300 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-950" />
          {isReadingFile ? <p className="mt-1 text-xs text-cyan-200">Reading image...</p> : null}
        </div>
        <div>
          <label htmlFor="machine-image-fit" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Image Display</label>
          <select id="machine-image-fit" name="imageFit" defaultValue={initialData.imageFit || "cover"} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white">
            <option value="cover">Crop to card (recommended)</option>
            <option value="contain">Show complete image</option>
          </select>
        </div>
        <div>
          <label htmlFor="machine-status" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Status</label>
          <select id="machine-status" name="status" defaultValue={initialData.status} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white">
            <option value="available">Available</option>
            <option value="in-use">In Use</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label htmlFor="machine-order" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Display Order</label>
          <input id="machine-order" name="order" type="number" defaultValue={initialData.order} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" />
        </div>
      </div>

      {image ? <img src={image} alt="Machinery preview" className="h-32 w-full rounded-lg border border-slate-700 object-cover sm:w-56" /> : null}

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200" disabled={isReadingFile}>{submitLabel}</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5">Cancel</button>
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
