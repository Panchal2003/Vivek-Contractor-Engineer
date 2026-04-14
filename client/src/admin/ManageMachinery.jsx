import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Search, Edit3, Trash2, Image } from "lucide-react";
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
    await load();
    await refreshStats();
  };

  const filteredItems = items.filter(i => 
    i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Machinery Management</h3>
          <p className="text-sm text-slate-500">Control equipment inventory details shown on user-facing pages</p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
          <Plus className="h-4 w-4" />
          Add Machinery
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
          placeholder="Search machinery..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 font-medium">
            <tr>
              <th className="px-4 py-3 border-b border-slate-100">Image</th>
              <th className="px-4 py-3 border-b border-slate-100">Name</th>
              <th className="px-4 py-3 border-b border-slate-100">Category</th>
              <th className="px-4 py-3 border-b border-slate-100">Status</th>
              <th className="px-4 py-3 border-b border-slate-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-10 w-14 rounded-lg object-cover border border-slate-100" />
                  ) : (
                    <div className="h-10 w-14 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Image className="h-4 w-4 text-slate-300" />
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-slate-700">{item.name}</td>
                <td className="px-4 py-3 text-slate-600">{item.category}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                    item.status === "available"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : item.status === "maintenance"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button type="button" onClick={() => setEditing(item)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => remove(item._id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-slate-400" colSpan={5}>
                  {searchTerm ? "No machinery matches your search." : "No machinery found. Add your first equipment!"}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

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
