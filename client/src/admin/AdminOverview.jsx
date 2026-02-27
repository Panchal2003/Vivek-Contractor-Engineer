import { Link, useOutletContext } from "react-router-dom";
import { BellRing, Boxes, CheckCheck, FileText, HardHat, Layers2, Sparkles } from "lucide-react";

const metricCards = [
  { key: "services", label: "Services", icon: Layers2, tone: "from-cyan-500/25 to-cyan-300/5" },
  { key: "projects", label: "Projects", icon: Boxes, tone: "from-indigo-500/25 to-indigo-300/5" },
  { key: "completedProjects", label: "Completed", icon: CheckCheck, tone: "from-emerald-500/25 to-emerald-300/5" },
  { key: "machinery", label: "Machinery", icon: HardHat, tone: "from-amber-500/25 to-amber-300/5" },
  { key: "inquiries", label: "Inquiries", icon: BellRing, tone: "from-rose-500/25 to-rose-300/5" },
];

export default function AdminOverview() {
  const { stats } = useOutletContext();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
          <Sparkles className="h-4 w-4" />
          Admin Control Center
        </p>
        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Operations Dashboard</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Use this panel to manage public site content, project inventory, and incoming user inquiries from one place.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metricCards.map((item) => (
          <article key={item.key} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${item.tone} p-4`}>
            <item.icon className="h-5 w-5 text-white/85" />
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-slate-300">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-white">{stats[item.key] || 0}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          <p className="mt-1 text-sm text-slate-400">Jump straight into core management tasks.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link to="/admin/services" className="rounded-xl border border-cyan-300/35 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20">
              Manage Services
            </Link>
            <Link to="/admin/projects" className="rounded-xl border border-indigo-300/35 bg-indigo-400/10 px-4 py-3 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-400/20">
              Manage Projects
            </Link>
            <Link to="/admin/machinery" className="rounded-xl border border-amber-300/35 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/20">
              Manage Machinery
            </Link>
            <Link to="/admin/inquiries" className="rounded-xl border border-rose-300/35 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/20">
              Review Inquiries
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
          <div className="flex items-center gap-2 text-white">
            <FileText className="h-4 w-4" />
            <h3 className="text-lg font-semibold">Status Notes</h3>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>1. Content updates from admin instantly affect user pages.</li>
            <li>2. User contact form submissions appear under inquiries.</li>
            <li>3. Use the admin key field if protected endpoints are enabled.</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
