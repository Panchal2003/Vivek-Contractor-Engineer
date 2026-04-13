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
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700 border border-amber-200/50">
          <Sparkles className="h-3.5 w-3.5" />
          Value Proposition
        </p>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Why Choose Us</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {displayPoints.map((point, idx) => (
            <article key={idx} className="flex items-start gap-3 rounded-xl border border-slate-200/50 bg-white p-4 text-left shadow-sm hover:shadow-md transition">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <p className="text-sm leading-relaxed text-slate-600">{point}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}