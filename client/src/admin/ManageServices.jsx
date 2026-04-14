import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Search, Edit3, Trash2, LayoutGrid, Table as TableIcon, CheckCircle, XCircle, GripVertical } from "lucide-react";
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
  const [viewMode, setViewMode] = useState("card");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

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
      setDeleteConfirm(null);
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
    <div className="space-y-4 sm:space-y-5">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800">Services</h3>
          <p className="text-xs sm:text-sm text-slate-500">Manage service cards</p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Service</span>
          <span className="sm:hidden">Add</span>
        </button>
      </header>

      {message && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 animate-fade-in">
          <p className="text-sm text-emerald-700 font-medium">{message}</p>
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 animate-fade-in">
          <p className="text-sm text-rose-700 font-medium">{error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>
        
        <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${viewMode === "card" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <LayoutGrid className="w-4 h-4" />
            Cards
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${viewMode === "table" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <TableIcon className="w-4 h-4" />
            Table
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden grid gap-3 sm:grid-cols-2">
        {filteredServices.map((service, index) => (
          <div 
            key={service._id}
            className="group relative bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="absolute top-3 left-3">
              <div className={`w-2.5 h-2.5 rounded-full ${service.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`}></div>
            </div>
            
            <div className="flex items-start justify-between gap-2 mb-3">
              <h4 className="font-bold text-slate-800 line-clamp-1">{service.title}</h4>
              <div className="flex gap-1">
                <button type="button" onClick={() => setEditing(service)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => setDeleteConfirm(service._id)} className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            
            <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200">
              {service.tag || "Service"}
            </span>
            
            <div className="mt-3 flex items-center gap-2">
              {service.isActive ? (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <CheckCircle className="w-3 h-3" /> Active
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                  <XCircle className="w-3 h-3" /> Inactive
                </span>
              )}
            </div>
          </div>
        ))}
        
        {filteredServices.length === 0 && (
          <div className="col-span-full text-center py-8 text-slate-400">
            <p className="text-sm">{searchTerm ? "No services match your search." : "No services found."}</p>
          </div>
        )}
      </div>

      {/* Desktop Views */}
      <div className="hidden lg:block">
        {viewMode === "card" ? (
          <div className="grid gap-4 xl:grid-cols-3">
            {filteredServices.map((service, index) => (
              <div 
                key={service._id}
                className="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="absolute top-4 left-4">
                  <div className={`w-2.5 h-2.5 rounded-full ${service.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`}></div>
                </div>
                
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h4 className="font-bold text-slate-800 text-lg">{service.title}</h4>
                  <div className="flex gap-1.5">
                    <button type="button" onClick={() => setEditing(service)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors hover:scale-110">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => setDeleteConfirm(service._id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors hover:scale-110">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200">
                  {service.tag || "Service"}
                </span>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {service.isActive ? (
                    <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                      <CheckCircle className="w-4 h-4" /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm font-medium text-slate-400">
                      <XCircle className="w-4 h-4" /> Inactive
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 text-xs uppercase tracking-[0.12em] text-slate-500 font-semibold">
                <tr>
                  <th className="px-5 py-4 border-b border-slate-200">Title</th>
                  <th className="px-5 py-4 border-b border-slate-200">Tag</th>
                  <th className="px-5 py-4 border-b border-slate-200">Status</th>
                  <th className="px-5 py-4 border-b border-slate-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service, index) => (
                  <tr 
                    key={service._id} 
                    className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-5 py-4 font-medium text-slate-700">{service.title}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200">
                        {service.tag || "Service"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {service.isActive ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                          <XCircle className="w-3 h-3" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex gap-2">
                        <button type="button" onClick={() => setEditing(service)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all hover:scale-110">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => setDeleteConfirm(service._id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all hover:scale-110">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl animate-scale-in">
            <h3 className="text-lg font-bold text-slate-800">Delete Service?</h3>
            <p className="mt-2 text-sm text-slate-500">This action cannot be undone. The service will be permanently removed.</p>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                Cancel
              </button>
              <button type="button" onClick={() => deleteService(deleteConfirm)} className="flex-1 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-rose-500/30 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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