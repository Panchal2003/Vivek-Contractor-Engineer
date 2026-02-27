import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { inquiriesAPI } from "../api/axios";

export default function ManageInquiries() {
  const { refreshStats } = useOutletContext();
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await inquiriesAPI.list();
      setInquiries(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load inquiries. Check admin key.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await inquiriesAPI.updateStatus(id, status);
    await load();
    await refreshStats();
  };

  const removeInquiry = async (id) => {
    await inquiriesAPI.remove(id);
    await load();
    await refreshStats();
  };

  return (
    <div className="space-y-5">
      <header>
        <h3 className="text-xl font-bold text-white">Inquiry Management</h3>
        <p className="text-sm text-slate-400">Track and update inquiries submitted by users from the contact form.</p>
      </header>

      {error ? <p className="rounded-lg border border-rose-300/25 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p> : null}

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60">
        <table className="w-full text-left text-sm text-slate-200">
          <thead className="bg-slate-900 text-xs uppercase tracking-[0.12em] text-slate-300">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item) => (
              <tr key={item._id} className="border-t border-slate-700 align-top">
                <td className="px-4 py-3">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.location}</p>
                  <p className="mt-1 text-xs text-slate-300">{item.message}</p>
                </td>
                <td className="px-4 py-3">
                  <p>{item.phone}</p>
                  <p className="text-xs text-slate-400">{item.email}</p>
                </td>
                <td className="px-4 py-3">{item.serviceType || "-"}</td>
                <td className="px-4 py-3">
                  <select value={item.status} onChange={(event) => updateStatus(item._id, event.target.value)} className="rounded-md border border-slate-600 bg-slate-950 px-2 py-1 text-xs text-white">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button type="button" onClick={() => removeInquiry(item._id)} className="rounded-md bg-rose-600 px-3 py-1 text-xs font-semibold text-white">Delete</button>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-slate-400" colSpan={5}>No inquiries found.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
