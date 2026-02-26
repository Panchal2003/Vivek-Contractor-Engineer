import { ArrowRight } from "lucide-react";

export default function ServiceCard({ icon, title, desc, tag = "Engineering Service" }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/75 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35">
      <div className="absolute -right-16 -top-14 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl"></div>

      <div className="relative z-10">
        <p className="mb-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-100">
          {tag}
        </p>

        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-orange-300/25 bg-orange-400/10 text-orange-300">
          <i className={`${icon} text-2xl`} />
        </div>

        <h3 className="text-xl font-extrabold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{desc}</p>

        <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition group-hover:text-cyan-100">
          Learn More
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
