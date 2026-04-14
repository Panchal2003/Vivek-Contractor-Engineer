import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Box, ClipboardList, Hammer, LayoutDashboard, LogOut, RefreshCcw, ShieldCheck, Menu, X, Building2, ChevronRight, BarChart3 } from "lucide-react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const [services, projects, machinery, inquiries] = await Promise.all([
        servicesAPI.list().catch(() => ({ data: [] })),
        projectsAPI.list().catch(() => ({ data: [] })),
        machineryAPI.list().catch(() => ({ data: [] })),
        inquiriesAPI.list().catch(() => ({ data: [] })),
      ]);

      setStats({
        services: services.data.length,
        projects: projects.data.length,
        completedProjects: projects.data.filter((project) => project.completed).length,
        machinery: machinery.data.length,
        inquiries: inquiries.data.length,
      });
    } catch {
      // stats are non-critical
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleLogout = () => {
    clearAdminKey();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 overflow-hidden">
      <aside className={`lg:sticky lg:top-0 lg:h-screen flex flex-col bg-white border-r border-slate-200 shadow-lg transition-all duration-300 overflow-hidden ${sidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100 shrink-0">
          {!sidebarCollapsed && (
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-indigo-600 font-bold">Vivek Contractors</p>
              <h1 className="text-lg font-bold text-slate-800">Admin Panel</h1>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden lg:flex p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-slate-100 shrink-0">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Control Center</p>
                <p className="text-xs text-slate-400">Manage content</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mx-auto">
              <Building2 className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {!sidebarCollapsed && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-white p-2 text-center shadow-sm border border-slate-100">
                <p className="text-lg font-bold text-slate-800">{stats.services}</p>
                <p className="text-[10px] uppercase text-slate-400">Services</p>
              </div>
              <div className="rounded-lg bg-white p-2 text-center shadow-sm border border-slate-100">
                <p className="text-lg font-bold text-slate-800">{stats.projects}</p>
                <p className="text-[10px] uppercase text-slate-400">Projects</p>
              </div>
              <div className="rounded-lg bg-white p-2 text-center shadow-sm border border-slate-100">
                <p className="text-lg font-bold text-slate-800">{stats.machinery}</p>
                <p className="text-[10px] uppercase text-slate-400">Machines</p>
              </div>
              <div className="rounded-lg bg-white p-2 text-center shadow-sm border border-slate-100">
                <p className="text-lg font-bold text-slate-800">{stats.inquiries}</p>
                <p className="text-[10px] uppercase text-slate-400">Inquiries</p>
              </div>
            </div>
          </div>
        )}

        <div className="p-3 border-t border-slate-100 shrink-0">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 rounded-xl w-full px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all duration-200 ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="lg:sticky lg:top-0 z-30 bg-white border-b border-slate-200 shadow-sm shrink-0">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Dashboard</h2>
                <p className="text-xs text-slate-500 hidden sm:block">Manage all site content and submissions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={loadStats}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all duration-200 shadow-sm disabled:opacity-70"
              >
                <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <Link to="/" className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all duration-200 shadow-sm">
                <ChevronRight className="w-4 h-4 rotate-[-90deg]" />
                <span className="hidden sm:inline">Website</span>
              </Link>
            </div>
          </div>

          <div className="lg:hidden px-3 pb-3 overflow-x-auto">
            <nav className="flex min-w-max gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      isActive ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "bg-slate-100 text-slate-600"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto">
            <Outlet context={{ refreshStats: loadStats, stats }} />
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 z-50 bg-white shadow-2xl p-5 lg:hidden animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-slate-700">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${
                      isActive ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
