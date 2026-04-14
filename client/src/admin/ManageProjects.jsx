import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Search, Edit3, Trash2, Image, LayoutGrid, Table as TableIcon, CheckCircle, Clock, MapPin } from "lucide-react";
import AddProject from "./AddProject";
import AdminModal from "./AdminModal";
import { projectsAPI } from "../api/axios";

export default function ManageProjects() {
  const { refreshStats } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const loadProjects = async () => {
    try {
      const { data } = await projectsAPI.list();
      setProjects(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load projects");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = async (payload) => {
    setError("");
    await projectsAPI.create(payload);
    setMessage("Project added successfully");
    await loadProjects();
    await refreshStats();
  };

  const updateProject = async (payload) => {
    setError("");
    await projectsAPI.update(editing._id, payload);
    setMessage("Project updated successfully");
    setEditing(null);
    await loadProjects();
    await refreshStats();
  };

  const deleteProject = async (id) => {
    setError("");
    await projectsAPI.remove(id);
    setMessage("Project deleted successfully");
    setDeleteConfirm(null);
    await loadProjects();
    await refreshStats();
  };

  const filteredProjects = projects.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800">Projects</h3>
          <p className="text-xs sm:text-sm text-slate-500">Manage project portfolio</p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Project</span>
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
            placeholder="Search projects..."
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
        {filteredProjects.map((project, index) => (
          <div 
            key={project._id}
            className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative h-28 sm:h-32 overflow-hidden">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <Image className="h-8 w-8 text-slate-300" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                {project.completed ? (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                    <CheckCircle className="w-2.5 h-2.5" /> Done
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                    <Clock className="w-2.5 h-2.5" /> Progress
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-3 sm:p-4">
              <span className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                {project.category || "Project"}
              </span>
              <h4 className="font-bold text-slate-800 mt-2 line-clamp-1">{project.title}</h4>
              {project.location && (
                <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                  <MapPin className="w-3 h-3" /> {project.location}
                </div>
              )}
              
              <div className="flex gap-2 mt-3">
                <button type="button" onClick={() => setEditing(project)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors">
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
                <button type="button" onClick={() => setDeleteConfirm(project._id)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold hover:bg-rose-100 transition-colors">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-8 text-slate-400">
            <p className="text-sm">{searchTerm ? "No projects match your search." : "No projects found."}</p>
          </div>
        )}
      </div>

      {/* Desktop Views */}
      <div className="hidden lg:block">
        {viewMode === "card" ? (
          <div className="grid gap-4 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <div 
                key={project._id}
                className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative h-36 xl:h-40 overflow-hidden">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <Image className="h-10 w-10 text-slate-300" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    {project.completed ? (
                      <span className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                        <CheckCircle className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                        <Clock className="w-3.5 h-3.5" /> In Progress
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-5">
                  <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                    {project.category || "Project"}
                  </span>
                  <h4 className="font-bold text-slate-800 text-lg mt-3">{project.title}</h4>
                  {project.location && (
                    <div className="flex items-center gap-1.5 mt-2 text-sm text-slate-500">
                      <MapPin className="w-4 h-4" /> {project.location}
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                    <button type="button" onClick={() => setEditing(project)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition-all hover:scale-105">
                      <Edit3 className="w-4 h-4" /> Edit
                    </button>
                    <button type="button" onClick={() => setDeleteConfirm(project._id)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-rose-50 text-rose-600 text-sm font-semibold hover:bg-rose-100 transition-all hover:scale-105">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 text-xs uppercase tracking-[0.12em] text-slate-500 font-semibold">
                <tr>
                  <th className="px-5 py-4 border-b border-slate-200">Image</th>
                  <th className="px-5 py-4 border-b border-slate-200">Title</th>
                  <th className="px-5 py-4 border-b border-slate-200">Category</th>
                  <th className="px-5 py-4 border-b border-slate-200">Location</th>
                  <th className="px-5 py-4 border-b border-slate-200">Status</th>
                  <th className="px-5 py-4 border-b border-slate-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <tr 
                    key={project._id} 
                    className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-5 py-4">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="h-12 w-16 rounded-lg object-cover border border-slate-100" />
                      ) : (
                        <div className="h-12 w-16 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Image className="h-5 w-5 text-slate-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-700">{project.title}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                        {project.category || "Project"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{project.location || "-"}</td>
                    <td className="px-5 py-4">
                      {project.completed ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3 h-3" /> Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" /> In Progress
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex gap-2">
                        <button type="button" onClick={() => setEditing(project)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all hover:scale-110">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => setDeleteConfirm(project._id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all hover:scale-110">
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
            <h3 className="text-lg font-bold text-slate-800">Delete Project?</h3>
            <p className="mt-2 text-sm text-slate-500">This action cannot be undone. The project will be permanently removed.</p>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                Cancel
              </button>
              <button type="button" onClick={() => deleteProject(deleteConfirm)} className="flex-1 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-rose-500/30 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isCreateOpen ? (
        <AdminModal title="Add Project" subtitle="Create a new project entry" onClose={() => setIsCreateOpen(false)}>
          <AddProject onSubmit={createProject} onCancel={() => setIsCreateOpen(false)} submitLabel="Create Project" />
        </AdminModal>
      ) : null}

      {editing ? (
        <AdminModal title="Edit Project" subtitle="Update project details" onClose={() => setEditing(null)}>
          <AddProject initialData={editing} onSubmit={updateProject} onCancel={() => setEditing(null)} submitLabel="Update Project" />
        </AdminModal>
      ) : null}
    </div>
  );
}