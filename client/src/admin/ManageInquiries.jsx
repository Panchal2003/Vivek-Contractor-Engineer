import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { inquiriesAPI } from "../api/axios";
import { Search, Trash2, Phone, Mail, MapPin, MessageSquare, CheckCircle, Clock, XCircle, LayoutGrid, Table as TableIcon, User, Building2, Calendar } from "lucide-react";

export default function ManageInquiries() {
  const { refreshStats } = useOutletContext();
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

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
    setDeleteConfirm(null);
    await load();
    await refreshStats();
  };

  const filteredInquiries = inquiries.filter(i => 
    i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.phone?.includes(searchTerm) ||
    i.serviceType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'New', icon: Clock };
      case 'contacted': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Contacted', icon: CheckCircle };
      case 'closed': return { bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-200', label: 'Closed', icon: XCircle };
      default: return { bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-200', label: status, icon: Clock };
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <header>
        <h3 className="text-lg sm:text-xl font-bold text-slate-800">Inquiries</h3>
        <p className="text-xs sm:text-sm text-slate-500">Track user submissions</p>
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
            placeholder="Search inquiries..."
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
      <div className="lg:hidden grid gap-3">
        {filteredInquiries.map((item, index) => {
          const statusStyle = getStatusColor(item.status);
          const StatusIcon = statusStyle.icon;
          return (
            <div 
              key={item._id}
              className="relative bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" /> {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently'}
                    </p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                  <StatusIcon className="w-2.5 h-2.5" /> {statusStyle.label}
                </span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Phone className="w-3 h-3 text-slate-400" /> {item.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Mail className="w-3 h-3 text-slate-400" /> {item.email}
                </div>
                {item.location && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3 h-3" /> {item.location}
                  </div>
                )}
              </div>
              
              {item.message && (
                <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2 mb-3">
                  <span className="font-medium text-slate-700">Message:</span> {item.message}
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <select 
                  value={item.status} 
                  onChange={(event) => updateStatus(item._id, event.target.value)} 
                  className="flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-medium bg-white cursor-pointer"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
                <button type="button" onClick={() => setDeleteConfirm(item._id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
        
        {filteredInquiries.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <p className="text-sm">{searchTerm ? "No inquiries match your search." : "No inquiries found."}</p>
          </div>
        )}
      </div>

      {/* Desktop Views */}
      <div className="hidden lg:block">
        {viewMode === "card" ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredInquiries.map((item, index) => {
              const statusStyle = getStatusColor(item.status);
              const StatusIcon = statusStyle.icon;
              return (
                <div 
                  key={item._id}
                  className="relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">{item.name}</h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently'}
                        </p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                      <StatusIcon className="w-3.5 h-3.5" /> {statusStyle.label}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="w-4 h-4 text-slate-400" /> {item.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="w-4 h-4 text-slate-400" /> {item.email}
                    </div>
                    {item.location && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="w-4 h-4" /> {item.location}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Building2 className="w-4 h-4" /> {item.serviceType || "General"}
                    </div>
                  </div>
                  
                  {item.message && (
                    <div className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3 mb-4">
                      <span className="font-medium text-slate-700">Message:</span> {item.message}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <select 
                      value={item.status} 
                      onChange={(event) => updateStatus(item._id, event.target.value)} 
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium bg-white cursor-pointer"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button type="button" onClick={() => setDeleteConfirm(item._id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all hover:scale-110">
                      <Trash2 className="h-4 w-4" />
                    </button>
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
                  <th className="px-5 py-4 border-b border-slate-200">User Info</th>
                  <th className="px-5 py-4 border-b border-slate-200">Contact</th>
                  <th className="px-5 py-4 border-b border-slate-200">Service</th>
                  <th className="px-5 py-4 border-b border-slate-200">Status</th>
                  <th className="px-5 py-4 border-b border-slate-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((item, index) => {
                  const statusStyle = getStatusColor(item.status);
                  const StatusIcon = statusStyle.icon;
                  return (
                    <tr 
                      key={item._id} 
                      className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors duration-200"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-700">{item.name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" /> {item.location || '-'}
                        </p>
                        <p className="text-xs text-slate-600 mt-2 flex items-start gap-1">
                          <MessageSquare className="h-3 w-3 mt-0.5" /> 
                          <span className="line-clamp-1">{item.message}</span>
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-slate-700 flex items-center gap-1.5 text-sm">
                          <Phone className="h-3.5 w-3.5 text-slate-400" /> {item.phone}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                          <Mail className="h-3.5 w-3.5" /> {item.email}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-lg bg-indigo-50 text-indigo-700 px-2.5 py-1 text-xs font-medium border border-indigo-100">
                          {item.serviceType || "General"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <select 
                          value={item.status} 
                          onChange={(event) => updateStatus(item._id, event.target.value)} 
                          className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium cursor-pointer bg-white ${statusStyle.border} ${statusStyle.text}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button type="button" onClick={() => setDeleteConfirm(item._id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all hover:scale-110">
                          <Trash2 className="h-4 w-4" />
                        </button>
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
            <h3 className="text-lg font-bold text-slate-800">Delete Inquiry?</h3>
            <p className="mt-2 text-sm text-slate-500">This action cannot be undone. The inquiry will be permanently removed.</p>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                Cancel
              </button>
              <button type="button" onClick={() => removeInquiry(deleteConfirm)} className="flex-1 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-rose-500/30 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}