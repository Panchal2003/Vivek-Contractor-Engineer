import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Machinery", path: "/machinery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-cyan-200/15 bg-slate-950/88 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="VCE Logo" className="h-12 w-12 rounded-full border border-white/20 object-cover" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Vivek</p>
            <p className="text-sm font-bold text-white">Contractor & Engineer</p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                location.pathname === link.path
                  ? "bg-cyan-300 text-slate-950"
                  : "text-slate-100 hover:bg-white/10"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

      <a
  href="https://wa.me/919266115666?text=Hello%20Vivek%20Contractor%20%26%20Engineer,%20I%20want%20to%20get%20a%20quotation."
  target="_blank"
  rel="noopener noreferrer"
  className="hidden items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-orange-400 lg:inline-flex"
>
  <Phone className="h-4 w-4" />
  Get Quote
</a>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg border border-white/20 p-2 text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-slate-950/95 transition-[max-height] duration-300 md:hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                location.pathname === link.path
                  ? "bg-cyan-300 text-slate-950"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
