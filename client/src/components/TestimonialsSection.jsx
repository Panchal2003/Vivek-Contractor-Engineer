import { MessageSquareQuote } from "lucide-react";

export default function TestimonialsSection({ testimonials = [] }) {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 text-center">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
          <MessageSquareQuote className="h-4 w-4" />
          Client Feedback
        </p>
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">What Our Clients Say</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map((t, idx) => (
            <article key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left shadow-md">
              <p className="text-sm italic leading-relaxed text-slate-600 sm:text-base">"{t.feedback}"</p>
              <h4 className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-orange-600">- {t.name}</h4>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
