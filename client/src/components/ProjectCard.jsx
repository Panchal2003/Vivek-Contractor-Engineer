export default function ProjectCard({ title, location, category, image, imageFit = "cover" }) {
  const fitClass = imageFit === "contain" ? "object-contain bg-slate-100" : "object-cover";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        {image ? <img src={image} alt={title} className={`h-48 w-full ${fitClass} transition-transform duration-500 group-hover:scale-105`} /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        {category ? <p className="text-xs font-bold uppercase tracking-widest text-amber-600">{category}</p> : null}
        <h3 className="mt-1 text-base font-bold text-slate-900">{title}</h3>
        {location ? <p className="mt-1 text-sm text-slate-500">{location}</p> : null}
      </div>
    </article>
  );
}