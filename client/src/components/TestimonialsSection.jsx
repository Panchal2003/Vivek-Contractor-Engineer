import { MessageSquareQuote } from "lucide-react";

export default function TestimonialsSection({ testimonials = [] }) {
  return (
    <section className="relative overflow-hidden bg-slate-950/60 py-20 sm:py-24 text-center">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1c_1px,transparent_1px)] bg-[size:48px_48px]"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
          <MessageSquareQuote className="h-4 w-4" />
          Client Feedback
        </p>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">What Our Clients Say</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map((t, idx) => (
            <article key={idx} className="rounded-2xl border border-white/15 bg-slate-900/80 p-6 text-left backdrop-blur-sm">
              <p className="text-sm italic leading-relaxed text-slate-200 sm:text-base">"{t.feedback}"</p>
              <h4 className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-orange-300">- {t.name}</h4>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
