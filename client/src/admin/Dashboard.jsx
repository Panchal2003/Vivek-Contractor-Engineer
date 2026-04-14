import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Box, ClipboardList, Hammer, LayoutDashboard, LogOut, RefreshCcw, ShieldCheck, Building2, ChevronRight, Bell, PanelLeftClose } from "lucide-react";
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
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 overflow-hidden">
      {/* Top Header - Fixed Height */}
      <header className="h-14 sm:h-16 shrink-0 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm z-40">
        <div className="flex items-center justify-between h-full px-4 sm:px-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 sm:w-9 h-8 sm:h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Building2 className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h2 className="text-sm font-bold text-slate-800">Vivek Contractors</h2>
                <p className="text-[10px] text-slate-500">Admin Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              {stats.inquiries > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              )}
            </button>
            
            <button
              onClick={loadStats}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 transition-all duration-200"
            >
              <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            
            <Link to="/" className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all duration-200">
              <ChevronRight className="w-4 h-4 rotate-[-90deg]" />
              <span className="hidden sm:inline">Website</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout - Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Full Height */}
        <aside className={`hidden md:flex flex-col bg-white border-r border-slate-200/50 shadow-xl transition-all duration-300 overflow-hidden ${sidebarCollapsed ? 'w-20' : 'w-64 lg:w-72'}`}>
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100/50 shrink-0">
            {!sidebarCollapsed && (
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-indigo-600 font-bold">Vivek Contractors</p>
                <h1 className="text-lg font-bold text-slate-800">Admin Panel</h1>
              </div>
            )}
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
              {sidebarCollapsed ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5 rotate-180" />
              )}
            </button>
          </div>

          {/* User Info */}
          {!sidebarCollapsed && (
            <div className="p-4 border-b border-slate-100/50 shrink-0">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Control Center</p>
                  <p className="text-[10px] text-slate-500">Manage content</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 group ${
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

          {/* Stats Grid */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-slate-100/50 bg-gradient-to-br from-slate-50 to-blue-50/30 shrink-0">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold mb-3">Quick Stats</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white p-2.5 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <p className="text-lg font-bold text-blue-600">{stats.services}</p>
                  <p className="text-[9px] uppercase text-slate-400">Services</p>
                </div>
                <div className="rounded-xl bg-white p-2.5 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <p className="text-lg font-bold text-indigo-600">{stats.projects}</p>
                  <p className="text-[9px] uppercase text-slate-400">Projects</p>
                </div>
                <div className="rounded-xl bg-white p-2.5 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <p className="text-lg font-bold text-amber-600">{stats.machinery}</p>
                  <p className="text-[9px] uppercase text-slate-400">Machines</p>
                </div>
                <div className="rounded-xl bg-white p-2.5 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <p className="text-lg font-bold text-rose-600">{stats.inquiries}</p>
                  <p className="text-[9px] uppercase text-slate-400">Inquiries</p>
                </div>
              </div>
            </div>
          )}

          {/* Logout */}
          <div className="p-3 border-t border-slate-100/50 shrink-0">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 rounded-xl w-full px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all duration-200 ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
              <LogOut className="w-5 h-5" />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5">
          <div className="max-w-6xl mx-auto">
            <Outlet context={{ refreshStats: loadStats, stats }} />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/50 shadow-xl shadow-slate-200/20 z-30 px-1">
        <div className="flex items-center justify-around h-full">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-400 hover:text-slate-600"
                }`
              }
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.to === '/admin/inquiries' && stats.inquiries > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <span className="text-[9px] font-semibold">{item.label}</span>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl text-rose-500 hover:bg-rose-50"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[9px] font-semibold">Logout</span>
          </button>
        </div>
      </nav>

      {/* Padding for bottom nav */}
      <div className="md:hidden h-16" />
    </div>
  );
}