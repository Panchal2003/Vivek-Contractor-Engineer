import { useState } from "react";

const defaultState = {
  title: "",
  description: "",
  location: "",
  category: "General",
  image: "",
  completed: false,
  order: 0,
};

export default function AddProject({ initialData = defaultState, onSubmit, onCancel, submitLabel = "Save Project" }) {
  const [image, setImage] = useState(initialData.image || "");
  const [isReadingFile, setIsReadingFile] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsReadingFile(true);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result?.toString() || "");
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
      completed: formData.get("completed") === "on",
      order: Number(formData.get("order") || 0),
    });
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{initialData?._id ? "Edit Project" : "Create Project"}</h3>
        <p className="text-xs text-slate-400">Manage featured and completed project cards shown on public pages.</p>
      </div>

      <div>
        <label htmlFor="project-title" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Title</label>
        <input id="project-title" name="title" defaultValue={initialData.title} required placeholder="Project title" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" />
      </div>

      <div>
        <label htmlFor="project-description" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Description</label>
        <textarea id="project-description" name="description" defaultValue={initialData.description} rows={3} placeholder="Description" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="project-location" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Location</label>
          <input id="project-location" name="location" defaultValue={initialData.location} placeholder="Location" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white w-full" />
        </div>
        <div>
          <label htmlFor="project-category" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Category</label>
          <input id="project-category" name="category" defaultValue={initialData.category} placeholder="Category" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white w-full" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="project-image-file" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Project Image</label>
          <input id="project-image-file" type="file" accept="image/*" onChange={handleFileChange} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-cyan-300 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-950" />
          {isReadingFile ? <p className="mt-1 text-xs text-cyan-200">Reading image...</p> : null}
        </div>
        <div>
          <label htmlFor="project-order" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Display Order</label>
          <input id="project-order" name="order" type="number" defaultValue={initialData.order} placeholder="0" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white w-full" />
        </div>
      </div>

      {image ? <img src={image} alt="Project preview" className="h-32 w-full rounded-lg border border-slate-700 object-cover sm:w-56" /> : null}

      <label className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
        <input name="completed" type="checkbox" defaultChecked={initialData.completed} />
        Completed project
      </label>

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200" disabled={isReadingFile}>{submitLabel}</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5">Cancel</button>
      </div>
    </form>
  );
}
