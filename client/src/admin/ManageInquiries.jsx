import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { inquiriesAPI } from "../api/axios";
import { Search, Trash2, Phone, Mail, MapPin, MessageSquare, CheckCircle, Clock, XCircle } from "lucide-react";

export default function ManageInquiries() {
  const { refreshStats } = useOutletContext();
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    setMessage("Status updated");
    await load();
    await refreshStats();
  };

  const removeInquiry = async (id) => {
    await inquiriesAPI.remove(id);
    setMessage("Inquiry deleted");
    await load();
    await refreshStats();
  };

  const filteredInquiries = inquiries.filter(i => 
    i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.phone?.includes(searchTerm) ||
    i.serviceType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch(status) {
      case 'new': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'contacted': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'closed': return <XCircle className="h-4 w-4 text-slate-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'contacted': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'closed': return 'bg-slate-100 text-slate-500 border border-slate-200';
      default: return '';
    }
  };

  return (
    <div className="space-y-5">
      <header>
        <h3 className="text-xl font-bold text-slate-800">Inquiry Management</h3>
        <p className="text-sm text-slate-500">Track and update inquiries submitted by users from the contact form</p>
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
          placeholder="Search inquiries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 font-medium">
            <tr>
              <th className="px-4 py-3 border-b border-slate-100">User Info</th>
              <th className="px-4 py-3 border-b border-slate-100">Contact</th>
              <th className="px-4 py-3 border-b border-slate-100">Service</th>
              <th className="px-4 py-3 border-b border-slate-100">Status</th>
              <th className="px-4 py-3 border-b border-slate-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.map((item) => (
              <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-700">{item.name}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" /> {item.location}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 flex items-start gap-1">
                    <MessageSquare className="h-3 w-3 mt-0.5" /> 
                    <span className="line-clamp-2">{item.message}</span>
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-slate-700 flex items-center gap-1">
                    <Phone className="h-3 w-3 text-slate-400" /> {item.phone}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Mail className="h-3 w-3" /> {item.email}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-lg bg-indigo-50 text-indigo-700 px-2 py-1 text-xs font-medium border border-indigo-100">
                    {item.serviceType || "General"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select 
                    value={item.status} 
                    onChange={(event) => updateStatus(item._id, event.target.value)} 
                    className={`rounded-lg border px-2 py-1.5 text-xs font-medium cursor-pointer appearance-none bg-white bg-no-repeat pl-8 pr-6 ${
                      item.status === 'new' 
                        ? 'border-blue-300 text-blue-700 bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ccircle%20cx%3D%226%22%20cy%3D%226%22%20r%3D%224%22%20fill%3D%22%233b82f6%22%2F%3E%3C%2Fsvg%3E")] bg-[left_0.4rem_center]'
                        : item.status === 'contacted'
                          ? 'border-emerald-300 text-emerald-700'
                          : 'border-slate-300 text-slate-500'
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button 
                    type="button" 
                    onClick={() => removeInquiry(item._id)} 
                    className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredInquiries.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-slate-400" colSpan={5}>
                  {searchTerm ? "No inquiries match your search." : "No inquiries found."}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
