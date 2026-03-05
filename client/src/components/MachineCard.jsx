import React from "react";

export default function MachineCard({ image, name, description, category, status, imageFit = "cover" }) {
  const fitClass = imageFit === "contain" ? "object-contain bg-slate-100" : "object-cover";
  const statusStyles =
    status === "available"
      ? "border-emerald-300/35 bg-emerald-500/10 text-emerald-200"
      : status === "maintenance"
        ? "border-amber-300/35 bg-amber-500/10 text-amber-200"
        : "border-blue-300/35 bg-blue-500/10 text-blue-200";

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/15 bg-slate-900/75 text-left shadow-lg shadow-slate-950/40 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200/35">
      <div className="relative overflow-hidden">
        <img src={image} alt={name} className={`h-56 w-full transition duration-500 group-hover:scale-105 sm:h-60 ${fitClass}`} />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          {category ? <span className="rounded-full border border-cyan-300/35 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-200">{category}</span> : null}
          {status ? <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles}`}>{status}</span> : null}
        </div>
        <h3 className="text-xl font-bold text-white">{name}</h3>
        {description ? <p className="text-sm leading-relaxed text-slate-300">{description}</p> : null}
      </div>
    </article>
  );
}
