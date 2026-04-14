import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

export default function ServiceCard({ icon, title, desc, tag = "Engineering Service" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <article className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-5 shadow-md transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
        <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl"></div>

        <div className="relative z-10">
          <p className="mb-2 inline-flex rounded-full border border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-700">
            {tag}
          </p>

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white">
            <i className={`${icon} text-xl`} />
          </div>

          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">{desc}</p>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-600 transition group-hover:text-amber-700"
          >
            Learn More
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </article>

      {isOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-3 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="inline-flex rounded-full border border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-700">
                  {tag}
                </p>
                <h3 className="mt-3 text-xl font-bold text-slate-900">{title}</h3>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-md border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50 p-3 text-amber-700">
              <i className={`${icon} mr-2`} />
              Service Capability
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">{desc}</p>

            <div className="mt-5">
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-sm font-bold text-white">
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}