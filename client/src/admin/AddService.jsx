const initialState = {
  title: "",
  description: "",
  icon: "fa-solid fa-screwdriver-wrench",
  tag: "Engineering Service",
  order: 0,
  isActive: true,
};

export default function AddService({ initialData = initialState, onSubmit, onCancel, submitLabel = "Save Service" }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await onSubmit({
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      icon: formData.get("icon")?.toString() || "fa-solid fa-screwdriver-wrench",
      tag: formData.get("tag")?.toString() || "Engineering Service",
      order: Number(formData.get("order") || 0),
      isActive: formData.get("isActive") === "on",
    });

    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{initialData?._id ? "Edit Service" : "Create Service"}</h3>
        <p className="text-xs text-slate-400">Control card content and ordering for the public services page.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="service-title" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Title</label>
          <input id="service-title" name="title" defaultValue={initialData.title} required placeholder="Service title" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" />
        </div>
        <div>
          <label htmlFor="service-tag" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Tag</label>
          <input id="service-tag" name="tag" defaultValue={initialData.tag} placeholder="Utility Networks" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white w-full" />
        </div>
      </div>

      <div>
        <label htmlFor="service-description" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Description</label>
        <textarea id="service-description" name="description" defaultValue={initialData.description} required rows={3} placeholder="Description" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="service-icon" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Icon Class</label>
          <input id="service-icon" name="icon" defaultValue={initialData.icon} placeholder="fa-solid fa-wrench" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white w-full" />
        </div>
        <div>
          <label htmlFor="service-order" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Display Order</label>
          <input id="service-order" name="order" type="number" defaultValue={initialData.order} placeholder="0" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white w-full" />
        </div>
      </div>

      <label className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
        <input name="isActive" type="checkbox" defaultChecked={initialData.isActive} />
        Active service
      </label>

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{submitLabel}</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5">Cancel</button>
      </div>
    </form>
  );
}
