import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
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
    setMessage("Project added");
    await loadProjects();
    await refreshStats();
  };

  const updateProject = async (payload) => {
    setError("");
    await projectsAPI.update(editing._id, payload);
    setMessage("Project updated");
    setEditing(null);
    await loadProjects();
    await refreshStats();
  };

  const deleteProject = async (id) => {
    setError("");
    await projectsAPI.remove(id);
    setMessage("Project deleted");
    await loadProjects();
    await refreshStats();
  };

  return (
    <div className="space-y-5">
      <header>
        <h3 className="text-xl font-bold text-white">Project Management</h3>
        <p className="text-sm text-slate-400">Maintain project cards and control completed project visibility.</p>
      </header>

      {message ? <p className="rounded-lg border border-emerald-300/25 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{message}</p> : null}
      {error ? <p className="rounded-lg border border-rose-300/25 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p> : null}

      <div className="flex justify-end">
        <button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60">
        <table className="w-full text-left text-sm text-slate-200">
          <thead className="bg-slate-900 text-xs uppercase tracking-[0.12em] text-slate-300">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Completed</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-t border-slate-700">
                <td className="px-4 py-3">{project.title}</td>
                <td className="px-4 py-3">{project.category}</td>
                <td className="px-4 py-3">{project.location}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${project.completed ? "bg-emerald-500/20 text-emerald-200" : "bg-amber-500/20 text-amber-200"}`}>
                    {project.completed ? "Completed" : "In Progress"}
                  </span>
                </td>
                <td className="space-x-2 px-4 py-3">
                  <button type="button" onClick={() => setEditing(project)} className="rounded-md bg-cyan-300 px-3 py-1 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200">Edit</button>
                  <button type="button" onClick={() => deleteProject(project._id)} className="rounded-md bg-rose-600 px-3 py-1 text-xs font-semibold text-white">Delete</button>
                </td>
              </tr>
            ))}
            {projects.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-slate-400" colSpan={5}>No projects found.</td>
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
