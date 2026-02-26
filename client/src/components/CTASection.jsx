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
    <section className={`relative overflow-hidden py-20 sm:py-24 ${sectionClasses}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,116,144,0.2),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(251,146,60,0.22),transparent_45%)]"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <article className="rounded-3xl border border-cyan-200/25 bg-slate-900/80 p-7 text-center backdrop-blur-md sm:p-10">
          <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
            <Sparkles className="h-4 w-4" />
            Start Your Project
          </p>
          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">{title}</h2>
          {subtitle && <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">{subtitle}</p>}

          <button
            type="button"
            onClick={() => navigate(to)}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-orange-400"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4" />
          </button>
        </article>
      </div>
    </section>
  );
}
