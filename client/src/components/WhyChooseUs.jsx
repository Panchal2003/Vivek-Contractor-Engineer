import { ShieldCheck, Sparkles } from "lucide-react";

export default function WhyChooseUs({ points = [] }) {
  const displayPoints =
    points.length > 0
      ? points
      : [
          "Safety-first execution with structured site controls.",
          "On-time delivery backed by milestone-driven planning.",
          "Experienced engineering team with practical field expertise.",
          "Transparent communication and documentation at every stage.",
        ];

  return (
    <section className="relative overflow-hidden bg-slate-950/70 py-20 sm:py-24 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(14,116,144,0.2),transparent_45%),radial-gradient(circle_at_84%_36%,rgba(251,146,60,0.16),transparent_52%)]"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
          <Sparkles className="h-4 w-4" />
          Value Proposition
        </p>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Why Choose Us</h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {displayPoints.map((point, idx) => (
            <article key={idx} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-slate-900/75 p-5 text-left backdrop-blur-sm">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base">{point}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
