import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import AddService from "./AddService";
import AdminModal from "./AdminModal";
import { servicesAPI } from "../api/axios";

export default function ManageServices() {
  const { refreshStats } = useOutletContext();
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadServices = async () => {
    try {
      const { data } = await servicesAPI.list();
      setServices(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load services");
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const createService = async (payload) => {
    setError("");
    await servicesAPI.create(payload);
    setMessage("Service added");
    await loadServices();
    await refreshStats();
  };

  const updateService = async (payload) => {
    setError("");
    await servicesAPI.update(editing._id, payload);
    setMessage("Service updated");
    setEditing(null);
    await loadServices();
    await refreshStats();
  };

  const deleteService = async (id) => {
    setError("");
    await servicesAPI.remove(id);
    setMessage("Service deleted");
    await loadServices();
    await refreshStats();
  };

  return (
    <div className="space-y-5">
      <header>
        <h3 className="text-xl font-bold text-white">Service Management</h3>
        <p className="text-sm text-slate-400">Add, edit, activate, and reorder service cards shown to users.</p>
      </header>

      {message ? <p className="rounded-lg border border-emerald-300/25 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{message}</p> : null}
      {error ? <p className="rounded-lg border border-rose-300/25 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p> : null}

      <div className="flex justify-end">
        <button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60">
        <table className="w-full text-left text-sm text-slate-200">
          <thead className="bg-slate-900 text-xs uppercase tracking-[0.12em] text-slate-300">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Tag</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-t border-slate-700">
                <td className="px-4 py-3">{service.title}</td>
                <td className="px-4 py-3">{service.tag}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${service.isActive ? "bg-emerald-500/20 text-emerald-200" : "bg-slate-700 text-slate-300"}`}>
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="space-x-2 px-4 py-3">
                  <button type="button" onClick={() => setEditing(service)} className="rounded-md bg-cyan-300 px-3 py-1 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200">Edit</button>
                  <button type="button" onClick={() => deleteService(service._id)} className="rounded-md bg-rose-600 px-3 py-1 text-xs font-semibold text-white">Delete</button>
                </td>
              </tr>
            ))}
            {services.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-slate-400" colSpan={4}>No services found.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {isCreateOpen ? (
        <AdminModal title="Add Service" subtitle="Create a new service card" onClose={() => setIsCreateOpen(false)}>
          <AddService onSubmit={createService} onCancel={() => setIsCreateOpen(false)} submitLabel="Create Service" />
        </AdminModal>
      ) : null}

      {editing ? (
        <AdminModal title="Edit Service" subtitle="Update service details" onClose={() => setEditing(null)}>
          <AddService initialData={editing} onSubmit={updateService} onCancel={() => setEditing(null)} submitLabel="Update Service" />
        </AdminModal>
      ) : null}
    </div>
  );
}
