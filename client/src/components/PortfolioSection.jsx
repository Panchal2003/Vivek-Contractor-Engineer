import { ArrowUpRight, FolderKanban, MapPin, X } from "lucide-react";
import { useState } from "react";

export default function PortfolioSection({ projects = [] }) {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950/70 py-20 sm:py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(14,116,144,0.2),transparent_45%),radial-gradient(circle_at_84%_40%,rgba(251,146,60,0.15),transparent_50%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
            <FolderKanban className="h-4 w-4" />
            Delivered Projects
          </p>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Portfolio</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((proj, idx) => (
              <article
                key={idx}
                className="group overflow-hidden rounded-2xl border border-white/15 bg-slate-900/75 text-left backdrop-blur-sm"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">{proj.title}</h3>
                  <button
                    type="button"
                    onClick={() => setActiveProject(proj)}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200"
                  >
                    View Case
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeProject ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">{activeProject.category || "Project"}</p>
                <h3 className="mt-1 text-2xl font-bold text-white">{activeProject.title}</h3>
              </div>
              <button type="button" onClick={() => setActiveProject(null)} className="rounded-md border border-slate-600 p-1.5 text-slate-300 hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
            </div>

            <img src={activeProject.image} alt={activeProject.title} className="mt-4 h-52 w-full rounded-xl object-cover sm:h-64" />

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              {activeProject.location ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800 px-3 py-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {activeProject.location}
                </span>
              ) : null}
              {activeProject.completed !== undefined ? (
                <span className={`rounded-full px-3 py-1 ${activeProject.completed ? "bg-emerald-500/20 text-emerald-200" : "bg-amber-500/20 text-amber-200"}`}>
                  {activeProject.completed ? "Completed" : "In Progress"}
                </span>
              ) : null}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {activeProject.description || "Detailed project documentation and execution notes are available with our team on request."}
            </p>

            <button type="button" onClick={() => setActiveProject(null)} className="mt-5 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
