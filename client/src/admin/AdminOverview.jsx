import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { BellRing, Boxes, CheckCheck, FileText, HardHat, Layers2, Sparkles, ArrowRight, TrendingUp, Zap } from "lucide-react";

const metricCards = [
  { key: "services", label: "Services", icon: Layers2, gradient: "from-blue-500 to-blue-600", bg: "bg-blue-50", border: "border-blue-100", shadow: "shadow-blue-600/10" },
  { key: "projects", label: "Projects", icon: Boxes, gradient: "from-indigo-500 to-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", shadow: "shadow-indigo-600/10" },
  { key: "completedProjects", label: "Completed", icon: CheckCheck, gradient: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", shadow: "shadow-emerald-600/10" },
  { key: "machinery", label: "Machinery", icon: HardHat, gradient: "from-amber-500 to-amber-600", bg: "bg-amber-50", border: "border-amber-100", shadow: "shadow-amber-600/10" },
  { key: "inquiries", label: "Inquiries", icon: BellRing, gradient: "from-rose-500 to-rose-600", bg: "bg-rose-50", border: "border-rose-100", shadow: "shadow-rose-600/10" },
];

export default function AdminOverview() {
  const { stats } = useOutletContext();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
            <Sparkles className="h-4 w-4" />
            Admin Control Center
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Operations Dashboard</h2>
          <p className="mt-2 max-w-2xl text-sm text-blue-100">
            Manage public site content, project inventory, and incoming user inquiries all in one place.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metricCards.map((item, index) => (
          <article 
            key={item.key} 
            className={`relative rounded-2xl border ${item.border} ${item.bg} p-4 transition-all duration-300 hover:shadow-lg ${item.shadow} hover:-translate-y-1`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg mb-3`}>
              <item.icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500 font-medium">{item.label}</p>
            <p className={`mt-1 text-3xl font-bold text-slate-800 transition-all duration-500 ${animated ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
              {item.key === 'completedProjects' ? stats.completedProjects || 0 : stats[item.key] || 0}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-100 bg-white p-5 lg:col-span-2 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Quick Actions</h3>
          </div>
          <p className="text-sm text-slate-500 mb-4">Jump straight into core management tasks.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link to="/admin/services" className="group rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition-all duration-200 flex items-center justify-between">
              Manage Services
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/admin/projects" className="group rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition-all duration-200 flex items-center justify-between">
              Manage Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/admin/machinery" className="group rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 hover:bg-amber-100 transition-all duration-200 flex items-center justify-between">
              Manage Machinery
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/admin/inquiries" className="group rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 hover:bg-rose-100 transition-all duration-200 flex items-center justify-between">
              Review Inquiries
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-100 bg-white p-5 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Tips</h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
              Update content to instantly reflect on the public site.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
              Contact form submissions appear in inquiries.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              Use admin key for protected endpoints.
            </li>
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-gradient-to-r from-emerald-50 to-blue-50 p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Performance Overview</h3>
            <p className="text-sm text-slate-500">Track your site's engagement metrics</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 rounded-xl bg-white border border-slate-100">
            <p className="text-2xl font-bold text-slate-800">{stats.projects || 0}</p>
            <p className="text-xs text-slate-500">Total Projects</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white border border-slate-100">
            <p className="text-2xl font-bold text-slate-800">{stats.completedProjects || 0}</p>
            <p className="text-xs text-slate-500">Completed</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white border border-slate-100">
            <p className="text-2xl font-bold text-slate-800">{stats.inquiries || 0}</p>
            <p className="text-xs text-slate-500">Inquiries</p>
          </div>
        </div>
      </section>
    </div>
  );
}
