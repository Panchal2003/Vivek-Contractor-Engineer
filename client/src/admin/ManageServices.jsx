import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Search, Edit3, Trash2, MoreVertical } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");

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
    setMessage("");
    try {
      await servicesAPI.create(payload);
      setMessage("Service added successfully");
      await loadServices();
      await refreshStats().catch(() => {});
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create service");
    }
  };

  const updateService = async (payload) => {
    setError("");
    setMessage("");
    try {
      await servicesAPI.update(editing._id, payload);
      setMessage("Service updated successfully");
      setEditing(null);
      await loadServices();
      await refreshStats().catch(() => {});
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update service");
    }
  };

  const deleteService = async (id) => {
    setError("");
    setMessage("");
    try {
      await servicesAPI.remove(id);
      setMessage("Service deleted successfully");
      await loadServices();
      await refreshStats().catch(() => {});
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete service");
    }
  };

  const filteredServices = services.filter(s => 
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.tag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Service Management</h3>
          <p className="text-sm text-slate-500">Add, edit, activate, and reorder service cards shown to users</p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </header>

      {message && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm text-emerald-700 font-medium">{message}</p>
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
          <p className="text-sm text-rose-700 font-medium">{error}</p>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 font-medium">
            <tr>
              <th className="px-4 py-3 border-b border-slate-100">Title</th>
              <th className="px-4 py-3 border-b border-slate-100">Tag</th>
              <th className="px-4 py-3 border-b border-slate-100">Status</th>
              <th className="px-4 py-3 border-b border-slate-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service, index) => (
              <tr key={service._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-700">{service.title}</td>
                <td className="px-4 py-3 text-slate-600">{service.tag}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${service.isActive ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-500 border border-slate-200"}`}>
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button type="button" onClick={() => setEditing(service)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => deleteService(service._id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredServices.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-slate-400" colSpan={4}>
                  {searchTerm ? "No services match your search." : "No services found. Add your first service!"}
                </td>
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
