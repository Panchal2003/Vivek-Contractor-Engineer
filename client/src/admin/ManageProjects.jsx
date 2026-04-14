import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Search, Edit3, Trash2, Image } from "lucide-react";
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
    await loadProjects();
    await refreshStats();
  };

  const filteredProjects = projects.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Project Management</h3>
          <p className="text-sm text-slate-500">Maintain project cards and control completed project visibility</p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
          <Plus className="h-4 w-4" />
          Add Project
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
          placeholder="Search projects..."
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
              <th className="px-4 py-3 border-b border-slate-100">Title</th>
              <th className="px-4 py-3 border-b border-slate-100">Category</th>
              <th className="px-4 py-3 border-b border-slate-100">Location</th>
              <th className="px-4 py-3 border-b border-slate-100">Status</th>
              <th className="px-4 py-3 border-b border-slate-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`h-10 w-14 rounded-lg object-cover border border-slate-100 ${project.imageFit === "contain" ? "object-contain bg-slate-50" : "object-cover"}`}
                    />
                  ) : (
                    <div className="h-10 w-14 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Image className="h-4 w-4 text-slate-300" />
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-slate-700">{project.title}</td>
                <td className="px-4 py-3 text-slate-600">{project.category}</td>
                <td className="px-4 py-3 text-slate-600">{project.location}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                    project.completed 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {project.completed ? "Completed" : "In Progress"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button type="button" onClick={() => setEditing(project)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => deleteProject(project._id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProjects.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-slate-400" colSpan={6}>
                  {searchTerm ? "No projects match your search." : "No projects found. Add your first project!"}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

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
