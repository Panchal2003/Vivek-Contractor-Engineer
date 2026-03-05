export default function ProjectCard({ title, location, category, image, imageFit = "cover" }) {
  const fitClass = imageFit === "contain" ? "object-contain bg-slate-100" : "object-cover";

  return (
    <article className="overflow-hidden rounded-2xl border border-white/15 bg-slate-900/75 shadow-lg shadow-slate-950/30 backdrop-blur-sm transition hover:-translate-y-1 hover:border-cyan-200/35">
      {image ? <img src={image} alt={title} className={`h-52 w-full ${fitClass}`} /> : null}
      <div className="p-5">
        {category ? <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">{category}</p> : null}
        <h3 className="mt-2 text-lg font-bold text-white">{title}</h3>
        {location ? <p className="mt-1 text-sm text-slate-300">{location}</p> : null}
      </div>
    </article>
  );
}
