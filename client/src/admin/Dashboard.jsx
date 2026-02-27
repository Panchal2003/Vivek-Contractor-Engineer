import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Box, ClipboardList, Hammer, LayoutDashboard, LogOut, RefreshCcw, ShieldCheck } from "lucide-react";
import { clearAdminKey, inquiriesAPI, machineryAPI, projectsAPI, servicesAPI } from "../api/axios";

const navItems = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/services", label: "Services", icon: ClipboardList },
  { to: "/admin/projects", label: "Projects", icon: Box },
  { to: "/admin/machinery", label: "Machinery", icon: Hammer },
  { to: "/admin/inquiries", label: "Inquiries", icon: ShieldCheck },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ services: 0, projects: 0, completedProjects: 0, machinery: 0, inquiries: 0 });

  const loadStats = async () => {
    const [services, projects, machinery, inquiries] = await Promise.all([
      servicesAPI.list(),
      projectsAPI.list(),
      machineryAPI.list(),
      inquiriesAPI.list().catch(() => ({ data: [] })),
    ]);

    setStats({
      services: services.data.length,
      projects: projects.data.length,
      completedProjects: projects.data.filter((project) => project.completed).length,
      machinery: machinery.data.length,
      inquiries: inquiries.data.length,
    });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleLogout = () => {
    clearAdminKey();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_8%_10%,rgba(14,116,144,0.25),transparent_40%),radial-gradient(circle_at_95%_85%,rgba(30,64,175,0.18),transparent_40%),#020617] text-slate-100">
      <div className="mx-auto flex max-w-[1500px] gap-4 p-3 sm:p-4 lg:p-6">
        <aside className="hidden w-72 shrink-0 rounded-3xl border border-white/10 bg-slate-900/85 p-5 backdrop-blur-xl lg:block">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">VCE Admin</p>
            <h1 className="mt-2 text-2xl font-bold text-white">Control Panel</h1>
            <p className="mt-2 text-sm text-slate-400">Professional content and inquiry operations workspace.</p>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-cyan-300 text-slate-950"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Snapshot</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
              <p className="rounded-lg bg-white/5 px-2 py-1">Services: {stats.services}</p>
              <p className="rounded-lg bg-white/5 px-2 py-1">Projects: {stats.projects}</p>
              <p className="rounded-lg bg-white/5 px-2 py-1">Machines: {stats.machinery}</p>
              <p className="rounded-lg bg-white/5 px-2 py-1">Inquiries: {stats.inquiries}</p>
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-4">
          <header className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">Admin Dashboard</h2>
                <p className="text-sm text-slate-400">Manage site content and user submissions from separate pages.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadStats}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/5"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Refresh
                </button>
                <Link to="/" className="rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/5">
                  View Website
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-lg border border-rose-600 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </header>

          <div className="no-scrollbar overflow-x-auto rounded-xl border border-white/10 bg-slate-900/65 p-2 lg:hidden">
            <nav className="flex min-w-max gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      isActive ? "bg-cyan-300 text-slate-950" : "bg-slate-800 text-slate-200"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <section className="rounded-2xl border border-white/10 bg-slate-900/65 p-4 backdrop-blur-xl sm:p-5">
            <Outlet context={{ refreshStats: loadStats, stats }} />
          </section>
        </div>
      </div>
    </div>
  );
}
