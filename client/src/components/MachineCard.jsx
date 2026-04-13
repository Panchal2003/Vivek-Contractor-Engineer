import React from "react";

export default function MachineCard({ image, name, description, category, status, imageFit = "cover" }) {
  const fitClass = imageFit === "contain" ? "object-contain bg-slate-100" : "object-cover";
  const statusStyles =
    status === "available"
      ? "border-green-200 bg-green-50 text-green-700"
      : status === "maintenance"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200/50 bg-white text-left shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img src={image} alt={name} className={`h-44 w-full transition duration-500 group-hover:scale-105 ${fitClass}`} />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {category ? <span className="rounded-full border border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50 px-2.5 py-1 text-xs font-bold text-amber-700">{category}</span> : null}
          {status ? <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles}`}>{status}</span> : null}
        </div>
        <h3 className="text-base font-bold text-slate-900">{name}</h3>
        {description ? <p className="text-sm leading-relaxed text-slate-600 line-clamp-2">{description}</p> : null}
      </div>
    </article>
  );
}