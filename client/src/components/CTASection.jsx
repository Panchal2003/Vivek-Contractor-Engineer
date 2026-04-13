import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTASection({
  title = "Ready To Start Your Infrastructure Project?",
  subtitle = "Let's build something extraordinary together.",
  buttonText = "Contact Us",
  to = "/contact",
  sectionClasses = "",
}) {
  const navigate = useNavigate();

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 sm:py-16 ${sectionClasses}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-center shadow-2xl shadow-amber-500/20 sm:p-8">
          <p className="relative z-10 mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
            Start Your Project
          </p>
          <h2 className="relative z-10 text-xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl">{title}</h2>
          {subtitle && <p className="relative z-10 mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">{subtitle}</p>}

          <button
            type="button"
            onClick={() => navigate(to)}
            className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition hover:scale-105 hover:shadow-xl hover:shadow-amber-500/40"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4" />
          </button>
        </article>
      </div>
    </section>
  );
}
