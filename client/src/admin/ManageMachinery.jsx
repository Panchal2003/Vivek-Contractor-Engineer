import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Search, Edit3, Trash2, Image, LayoutGrid, Table as TableIcon, CheckCircle, Clock, Wrench, XCircle } from "lucide-react";
import AdminModal from "./AdminModal";
import MachineryForm from "./MachineryForm";
import { machineryAPI } from "../api/axios";

export default function ManageMachinery() {
  const { refreshStats } = useOutletContext();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = async () => {
    try {
      const { data } = await machineryAPI.list();
      setItems(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load machinery");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createMachinery = async (payload) => {
    setError("");
    await machineryAPI.create(payload);
    setMessage("Machinery added successfully");
    await load();
    await refreshStats();
  };

  const updateMachinery = async (payload) => {
    setError("");
    await machineryAPI.update(editing._id, payload);
    setMessage("Machinery updated successfully");
    setEditing(null);
    await load();
    await refreshStats();
  };

  const remove = async (id) => {
    setError("");
    await machineryAPI.remove(id);
    setMessage("Machinery deleted successfully");
    setDeleteConfirm(null);
    await load();
    await refreshStats();
  };

  const filteredItems = items.filter(i => 
    i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case "available": return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: "Available" };
      case "maintenance": return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "Maintenance" };
      case "in-use": return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", label: "In Use" };
      default: return { bg: "bg-slate-50", text: "text-slate-500", border: "border-slate-200", label: status };
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800">Machinery</h3>
          <p className="text-xs sm:text-sm text-slate-500">Manage equipment inventory</p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Machinery</span>
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
            placeholder="Search machinery..."
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
        {filteredItems.map((item, index) => {
          const statusStyle = getStatusColor(item.status);
          return (
            <div 
              key={item._id}
              className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-28 sm:h-32 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <Wrench className="h-8 w-8 text-slate-300" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                    {statusStyle.label}
                  </span>
                </div>
              </div>
              
              <div className="p-3 sm:p-4">
                <span className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold bg-violet-50 text-violet-600 border border-violet-100">
                  {item.category || "Equipment"}
                </span>
                <h4 className="font-bold text-slate-800 mt-2 line-clamp-1">{item.name}</h4>
                {item.capacity && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                    <Wrench className="w-3 h-3" /> {item.capacity}
                  </div>
                )}
                
                <div className="flex gap-2 mt-3">
                  <button type="button" onClick={() => setEditing(item)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors">
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                  <button type="button" onClick={() => setDeleteConfirm(item._id)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold hover:bg-rose-100 transition-colors">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-8 text-slate-400">
            <p className="text-sm">{searchTerm ? "No machinery matches your search." : "No machinery found."}</p>
          </div>
        )}
      </div>

      {/* Desktop Views */}
      <div className="hidden lg:block">
        {viewMode === "card" ? (
          <div className="grid gap-4 xl:grid-cols-3">
            {filteredItems.map((item, index) => {
              const statusStyle = getStatusColor(item.status);
              return (
                <div 
                  key={item._id}
                  className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="relative h-36 xl:h-40 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <Wrench className="h-10 w-10 text-slate-300" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                        {statusStyle.label}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-violet-50 text-violet-600 border border-violet-100">
                      {item.category || "Equipment"}
                    </span>
                    <h4 className="font-bold text-slate-800 text-lg mt-3">{item.name}</h4>
                    {item.capacity && (
                      <div className="flex items-center gap-1.5 mt-2 text-sm text-slate-500">
                        <Wrench className="w-4 h-4" /> {item.capacity}
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                      <button type="button" onClick={() => setEditing(item)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition-all hover:scale-105">
                        <Edit3 className="w-4 h-4" /> Edit
                      </button>
                      <button type="button" onClick={() => setDeleteConfirm(item._id)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-rose-50 text-rose-600 text-sm font-semibold hover:bg-rose-100 transition-all hover:scale-105">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 text-xs uppercase tracking-[0.12em] text-slate-500 font-semibold">
                <tr>
                  <th className="px-5 py-4 border-b border-slate-200">Image</th>
                  <th className="px-5 py-4 border-b border-slate-200">Name</th>
                  <th className="px-5 py-4 border-b border-slate-200">Category</th>
                  <th className="px-5 py-4 border-b border-slate-200">Status</th>
                  <th className="px-5 py-4 border-b border-slate-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => {
                  const statusStyle = getStatusColor(item.status);
                  return (
                    <tr 
                      key={item._id} 
                      className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors duration-200"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-5 py-4">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-12 w-16 rounded-lg object-cover border border-slate-100" />
                        ) : (
                          <div className="h-12 w-16 rounded-lg bg-slate-100 flex items-center justify-center">
                            <Wrench className="h-5 w-5 text-slate-300" />
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-700">{item.name}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold bg-violet-50 text-violet-600 border border-violet-100">
                          {item.category || "Equipment"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                          {statusStyle.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex gap-2">
                          <button type="button" onClick={() => setEditing(item)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all hover:scale-110">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button type="button" onClick={() => setDeleteConfirm(item._id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all hover:scale-110">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
            <h3 className="text-lg font-bold text-slate-800">Delete Machinery?</h3>
            <p className="mt-2 text-sm text-slate-500">This action cannot be undone. The machinery will be permanently removed.</p>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                Cancel
              </button>
              <button type="button" onClick={() => remove(deleteConfirm)} className="flex-1 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-rose-500/30 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isCreateOpen ? (
        <AdminModal title="Add Machinery" subtitle="Create new machinery entry" onClose={() => setIsCreateOpen(false)}>
          <MachineryForm onSubmit={createMachinery} onCancel={() => setIsCreateOpen(false)} submitLabel="Create Machinery" />
        </AdminModal>
      ) : null}

      {editing ? (
        <AdminModal title="Edit Machinery" subtitle="Update machinery details" onClose={() => setEditing(null)}>
          <MachineryForm initialData={editing} onSubmit={updateMachinery} onCancel={() => setEditing(null)} submitLabel="Update Machinery" />
        </AdminModal>
      ) : null}
    </div>
  );
}