import { Link } from "react-router-dom";
import { Drill, HardHat, Mail, MapPin, Phone, Wrench } from "lucide-react";

export default function Footer() {
  const floatingTools = [
    { icon: Wrench, className: "top-[18%] left-[10%] animate-float-slow" },
    { icon: HardHat, className: "top-[24%] right-[9%] animate-float-delay" },
    { icon: Drill, className: "bottom-[22%] left-[18%] animate-float" },
    { icon: Wrench, className: "bottom-[18%] right-[14%] animate-float-slow" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-cyan-200/20 bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(14,116,144,0.25),transparent_45%),radial-gradient(circle_at_85%_26%,rgba(251,146,60,0.2),transparent_52%)]"></div>
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:44px_44px]"></div>

      {floatingTools.map((item, idx) => (
        <div key={idx} className={`pointer-events-none absolute hidden rounded-full border border-white/15 bg-slate-900/70 p-3 md:block ${item.className}`}>
          <item.icon className="h-5 w-5 text-cyan-200" />
        </div>
      ))}

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-extrabold tracking-tight text-white">VCE</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-cyan-200">Infrastructure & Management</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
            Precision engineering partner for sewer, fire line, water treatment, and infrastructure delivery. We execute with safety, quality, and on-time accountability.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-cyan-200/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">Government Projects</span>
            <span className="rounded-full border border-cyan-200/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">Industrial Utilities</span>
            <span className="rounded-full border border-cyan-200/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">Civil Infrastructure</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-orange-300">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/projects" className="hover:text-white">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-orange-300">Contact</h4>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-cyan-200" />
              +91 92661 15666
            </p>
            <p className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-cyan-200" />
              info@vceinfra.in
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-cyan-200" />
              India
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400 sm:px-6 lg:px-8">
        &copy; {new Date().getFullYear()} VCE Infra. All rights reserved.
      </div>
    </footer>
  );
}

