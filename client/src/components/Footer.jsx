import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react";
import SITE_CONFIG from "../config/siteConfig";
import logo from "../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const startYear = SITE_CONFIG.defaults.yearStarted;

  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Machinery", path: "/machinery" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-900 text-slate-300 hidden lg:block">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[size:60px_60px]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="VCE Logo" className="h-14 w-14 rounded-full border-2 border-amber-500 shadow-md" />
              <div>
                <h3 className="text-2xl font-bold text-white">{SITE_CONFIG.company.shortName}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Contractor & Engineer</p>
              </div>
            </Link>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-400">
              Precision engineering partner for sewer, fire line, water treatment, and infrastructure delivery. We execute with safety, quality, and on-time accountability across India.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Government Projects", "Industrial Utilities", "Civil Infrastructure", "Maintenance"].map((tag) => (
                <span key={tag} className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 text-slate-400 transition-all hover:bg-amber-500 hover:text-white hover:border-amber-500"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="flex items-center gap-2 text-slate-400 transition-all hover:text-amber-400 hover:translate-x-1">
                    <ArrowRight className="h-3 w-3 text-amber-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <span className="text-slate-300 font-medium">{SITE_CONFIG.contact.phone}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <span className="text-slate-300 font-medium">{SITE_CONFIG.contact.email}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <span className="text-slate-300 font-medium">{SITE_CONFIG.contact.address}</span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Get Started</h4>
            <p className="text-sm text-slate-400">
              Ready to start your project? Contact us for a free consultation.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-slate-800 bg-slate-950/50 px-4 py-6 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          &copy; {startYear} - {currentYear} <span className="text-white font-semibold">{SITE_CONFIG.company.name}</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}