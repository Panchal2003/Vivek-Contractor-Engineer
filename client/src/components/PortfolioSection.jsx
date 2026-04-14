import { ArrowUpRight, FolderKanban, MapPin, X } from "lucide-react";
import { useState } from "react";

export default function PortfolioSection({ projects = [] }) {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <section className="relative overflow-hidden bg-white py-12 sm:py-16 text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/2 right-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700 border border-amber-200/50">
            <FolderKanban className="h-3.5 w-3.5" />
            Delivered Projects
          </p>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Our Portfolio</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((proj, idx) => {
              const fitClass = proj.imageFit === "contain" ? "object-contain bg-slate-100" : "object-cover";

              return (
                <article
                  key={idx}
                  className="group overflow-hidden rounded-2xl border border-slate-200/50 bg-white text-left shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className={`h-48 w-full transition duration-500 group-hover:scale-105 ${fitClass}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                    <button
                      type="button"
                      onClick={() => setActiveProject(proj)}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-amber-600"
                    >
                      View Case
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {activeProject ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-3 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600">{activeProject.category || "Project"}</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">{activeProject.title}</h3>
              </div>
              <button type="button" onClick={() => setActiveProject(null)} className="rounded-md border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50">
                <X className="h-4 w-4" />
              </button>
            </div>

            <img
              src={activeProject.image}
              alt={activeProject.title}
              className={`mt-4 h-40 w-full rounded-xl object-cover`}
            />

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              {activeProject.location ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {activeProject.location}
                </span>
              ) : null}
              {activeProject.completed !== undefined ? (
                <span className={`rounded-full px-3 py-1 ${activeProject.completed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {activeProject.completed ? "Completed" : "In Progress"}
                </span>
              ) : null}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {activeProject.description || "Detailed project documentation and execution notes are available with our team on request."}
            </p>

            <button type="button" onClick={() => setActiveProject(null)} className="mt-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-sm font-bold text-white">
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}