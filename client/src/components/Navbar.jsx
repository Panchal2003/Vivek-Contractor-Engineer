import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Info, Settings, FolderOpen, Hammer, Mail, MessageCircle, X, Menu } from "lucide-react";
import logo from "../assets/logo.png";
import SITE_CONFIG from "../config/siteConfig";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/", icon: Home, color: "amber", activeGradient: "from-amber-500 to-orange-500", activeText: "text-amber-600" },
    { name: "About", path: "/about", icon: Info, color: "violet", activeGradient: "from-violet-500 to-purple-600", activeText: "text-violet-600" },
    { name: "Services", path: "/services", icon: Settings, color: "emerald", activeGradient: "from-emerald-500 to-green-600", activeText: "text-emerald-600" },
    { name: "Projects", path: "/projects", icon: FolderOpen, color: "orange", activeGradient: "from-orange-500 to-red-500", activeText: "text-orange-600" },
    { name: "Machinery", path: "/machinery", icon: Hammer, color: "rose", activeGradient: "from-rose-500 to-pink-600", activeText: "text-rose-600" },
    { name: "Contact", path: "/contact", icon: Mail, color: "cyan", activeGradient: "from-cyan-500 to-blue-600", activeText: "text-cyan-600" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHomePage
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-200/20'
          : 'bg-white/80 backdrop-blur-lg border-b border-slate-100'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-18 items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-3 group lg:cursor-pointer select-none"
              onTouchStart={() => {
                timerRef.current = setTimeout(() => {
                  navigate("/admin/login");
                }, 3000);
              }}
              onTouchEnd={() => clearTimeout(timerRef.current)}
              onMouseDown={() => {
                timerRef.current = setTimeout(() => {
                  navigate("/admin/login");
                }, 3000);
              }}
              onMouseUp={() => clearTimeout(timerRef.current)}
              onMouseLeave={() => clearTimeout(timerRef.current)}
              onContextMenu={(e) => {
                e.preventDefault();
                navigate("/admin/login");
              }}
            >
              <div className="relative">
                <img 
                  src={logo} 
                  alt="VCE Logo" 
                  className="h-10 w-10 lg:h-12 lg:w-12 rounded-full border-2 border-amber-500 object-cover shadow-md group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white animate-pulse"></div>
              </div>
              <div className="block">
                <p className="text-sm lg:text-base font-bold uppercase tracking-wider text-slate-800">{SITE_CONFIG.company.shortName}</p>
                <p className="text-[10px] lg:text-xs font-medium text-slate-500 uppercase tracking-wider">Contractors & Engineers</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      isActive
                        ? `${link.activeText} bg-gradient-to-r ${link.activeGradient}/10`
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-gradient-to-r ${link.activeGradient} animate-pulse`}></span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href={SITE_CONFIG.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                Get Quote
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl animate-revealDown">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? `bg-gradient-to-r ${link.activeGradient} text-white`
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
              <a
                href={SITE_CONFIG.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full mt-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-sm font-bold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Get Quote
              </a>
            </div>
          </div>
        )}
      </nav>

      <div className="h-16 lg:hidden"></div>
    </>
  );
}