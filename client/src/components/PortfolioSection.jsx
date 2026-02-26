import { ArrowUpRight, FolderKanban } from "lucide-react";

export default function PortfolioSection({ projects = [] }) {
  return (
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
                <button type="button" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  View Case
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
