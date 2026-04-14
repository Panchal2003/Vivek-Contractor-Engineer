import { useState } from "react";
import ImageCropModal from "./ImageCropModal";
import { Upload, Image, X, Check } from "lucide-react";

const defaultState = {
  title: "",
  description: "",
  location: "",
  category: "General",
  image: "",
  imageFit: "cover",
  completed: false,
  order: 0,
};

export default function AddProject({ initialData = defaultState, onSubmit, onCancel, submitLabel = "Save Project" }) {
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
    reader.onerror = () => {
      setIsReadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await onSubmit({
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      location: formData.get("location")?.toString() || "",
      category: formData.get("category")?.toString() || "General",
      image,
      imageFit: formData.get("imageFit")?.toString() || "cover",
      completed: formData.get("completed") === "on",
      order: Number(formData.get("order") || 0),
    });
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100/50">
        <p className="text-sm font-medium text-slate-700">
          {initialData?._id ? "Update project details" : "Add a new project to your portfolio"}
        </p>
        <p className="text-xs text-slate-500 mt-1">Manage featured and completed project cards shown on public pages.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="project-title" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Project Title</label>
          <input id="project-title" name="title" defaultValue={initialData.title} required placeholder="e.g., Highway Bridge Construction" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
        </div>
        <div>
          <label htmlFor="project-location" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Location</label>
          <input id="project-location" name="location" defaultValue={initialData.location} placeholder="e.g., Mumbai, Maharashtra" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
        </div>
        <div>
          <label htmlFor="project-category" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Category</label>
          <input id="project-category" name="category" defaultValue={initialData.category} placeholder="e.g., Infrastructure" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
        </div>
      </div>

      <div>
        <label htmlFor="project-description" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Description</label>
        <textarea id="project-description" name="description" defaultValue={initialData.description} rows={3} placeholder="Describe the project in detail..." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label htmlFor="project-image-file" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Project Image</label>
          <div className="relative">
            <input id="project-image-file" type="file" accept="image/*" onChange={handleFileChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-blue-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white file:shadow-lg file:shadow-indigo-600/25" />
            {isReadingFile && <p className="mt-1 text-xs text-indigo-600">Reading image...</p>}
          </div>
        </div>
        <div>
          <label htmlFor="project-image-fit" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Image Display</label>
          <select id="project-image-fit" name="imageFit" defaultValue={initialData.imageFit || "cover"} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
            <option value="cover">Crop to card</option>
            <option value="contain">Show complete</option>
          </select>
        </div>
      </div>

      {image && (
        <div className="relative rounded-xl overflow-hidden border border-slate-200">
          <img src={image} alt="Project preview" className="h-40 w-full object-cover" />
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="project-order" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Display Order</label>
          <input id="project-order" name="order" type="number" defaultValue={initialData.order} placeholder="0" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
        </div>
        <div className="flex items-end">
          <label className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors w-full">
            <input 
              name="completed" 
              type="checkbox" 
              defaultChecked={initialData.completed}
              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
            />
            <span className="font-medium">Completed project</span>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button 
          type="submit" 
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:shadow-xl hover:shadow-indigo-600/30 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300"
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
          title="Crop Project Image"
          description="Adjust framing, zoom and position before saving your project card image."
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
