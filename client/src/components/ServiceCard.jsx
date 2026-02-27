import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

export default function ServiceCard({ icon, title, desc, tag = "Engineering Service" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition group-hover:text-cyan-100"
          >
            Learn More
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </article>

      {isOpen ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-100">
                  {tag}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white">{title}</h3>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-md border border-slate-600 p-1.5 text-slate-300 hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-orange-300/25 bg-orange-400/10 p-3 text-orange-200">
              <i className={`${icon} mr-2`} />
              Service Capability
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">{desc}</p>

            <div className="mt-5">
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
