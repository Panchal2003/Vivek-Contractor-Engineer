import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import AdminModal from "./AdminModal";
import MachineryForm from "./MachineryForm";
import { machineryAPI } from "../api/axios";

export default function ManageMachinery() {
  const { refreshStats } = useOutletContext();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [error, setError] = useState("");

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
    await load();
    await refreshStats();
  };

  const updateMachinery = async (payload) => {
    setError("");
    await machineryAPI.update(editing._id, payload);
    setEditing(null);
    await load();
    await refreshStats();
  };

  const remove = async (id) => {
    setError("");
    await machineryAPI.remove(id);
    await load();
    await refreshStats();
  };

  return (
    <div className="space-y-5">
      <header>
        <h3 className="text-xl font-bold text-white">Machinery Management</h3>
        <p className="text-sm text-slate-400">Control equipment inventory details shown on user-facing pages.</p>
      </header>

      {error ? <p className="rounded-lg border border-rose-300/25 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p> : null}

      <div className="flex justify-end">
        <button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
          <Plus className="h-4 w-4" />
          Add Machinery
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60">
        <table className="w-full text-left text-sm text-slate-200">
          <thead className="bg-slate-900 text-xs uppercase tracking-[0.12em] text-slate-300">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t border-slate-700">
                <td className="px-4 py-3">
                  {item.image ? <img src={item.image} alt={item.name} className="h-10 w-14 rounded-md object-cover" /> : <span className="text-xs text-slate-500">No image</span>}
                </td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    item.status === "available"
                      ? "bg-emerald-500/20 text-emerald-200"
                      : item.status === "maintenance"
                        ? "bg-amber-500/20 text-amber-200"
                        : "bg-blue-500/20 text-blue-200"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="space-x-2 px-4 py-3">
                  <button type="button" onClick={() => setEditing(item)} className="rounded-md bg-cyan-300 px-3 py-1 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200">Edit</button>
                  <button type="button" onClick={() => remove(item._id)} className="rounded-md bg-rose-600 px-3 py-1 text-xs font-semibold text-white">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-slate-400" colSpan={5}>No machinery items found.</td>
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
