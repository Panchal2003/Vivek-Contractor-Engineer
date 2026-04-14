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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100/50">
        <p className="text-sm font-medium text-slate-700">
          {initialData?._id ? "Update service details" : "Add a new service to your portfolio"}
        </p>
        <p className="text-xs text-slate-500 mt-1">Control card content and ordering for the public services page.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="service-title" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Service Title</label>
          <input id="service-title" name="title" defaultValue={initialData.title} required placeholder="e.g., Industrial Construction" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
        <div>
          <label htmlFor="service-tag" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Tag</label>
          <input id="service-tag" name="tag" defaultValue={initialData.tag} placeholder="e.g., Engineering Services" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
        <div>
          <label htmlFor="service-order" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Display Order</label>
          <input id="service-order" name="order" type="number" defaultValue={initialData.order} placeholder="0" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
      </div>

      <div>
        <label htmlFor="service-description" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Description</label>
        <textarea id="service-description" name="description" defaultValue={initialData.description} required rows={4} placeholder="Describe the service in detail..." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none" />
      </div>

      <div>
        <label htmlFor="service-icon" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Icon Class (FontAwesome)</label>
        <input id="service-icon" name="icon" defaultValue={initialData.icon} placeholder="fa-solid fa-wrench" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
      </div>

      <label className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors">
        <input 
          name="isActive" 
          type="checkbox" 
          defaultChecked={initialData.isActive}
          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
        />
        <span className="font-medium">Active service</span>
        <span className="text-xs text-slate-400">- Display on public site</span>
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button 
          type="submit" 
          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
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
    </form>
  );
}
