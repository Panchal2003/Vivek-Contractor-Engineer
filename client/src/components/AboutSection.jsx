import { Building2, Cog, Hammer, Wrench } from "lucide-react";

const ICONS_MAP = {
  cog: Cog,
  wrench: Wrench,
  hammer: Hammer,
};

const COLOR_MAP = {
  blue: "text-blue-700 bg-blue-50 border-blue-200",
  red: "text-orange-700 bg-orange-50 border-orange-200",
  purple: "text-violet-700 bg-violet-50 border-violet-200",
};

export default function AboutSection({
  title = "About",
  highlight = "",
  subtitle = "Engineering capability with disciplined delivery.",
  description = "",
  features = [],
  videoSrc = "",
  sectionClasses = "",
  iconSize = 20,
}) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 sm:py-16 ${sectionClasses}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <article className="relative rounded-2xl border border-slate-200/50 bg-white p-6 shadow-lg shadow-slate-500/10 sm:p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700 border border-amber-200/50">
            <Building2 className="h-3.5 w-3.5" />
            Company Profile
          </p>

          <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">{highlight}</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>
          <p className="mt-2 text-sm font-semibold text-amber-700">{subtitle}</p>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {features.map((feature) => {
              const FeatureIcon = ICONS_MAP[feature.icon] || Cog;
              const colorClass = COLOR_MAP[feature.color] || COLOR_MAP.blue;

              return (
                <div key={feature.text} className={`flex items-center gap-2.5 rounded-lg border p-3 ${colorClass}`}>
                  <FeatureIcon size={iconSize} className="shrink-0" />
                  <p className="text-sm font-medium text-slate-700">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </article>

        <article className="relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-xl shadow-slate-500/10">
          {videoSrc && (
            <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/80"></div>
          <div className="relative z-10 flex min-h-[280px] sm:min-h-[350px] flex-col justify-end p-4 sm:p-6">
            <h3 className="text-xl font-bold text-white sm:text-2xl">Execution Confidence</h3>
            <p className="mt-1.5 max-w-md text-sm text-slate-200">
              Structured planning, measurable quality checks, and field-tested manpower for high-impact infrastructure delivery.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-3">
                <p className="text-xl font-bold text-white">120+</p>
                <p className="text-xs text-slate-300">Projects Delivered</p>
              </div>
              <div className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-3">
                <p className="text-xl font-bold text-white">25+</p>
                <p className="text-xs text-slate-300">Years Experience</p>
              </div>
              <div className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-3">
                <p className="text-xl font-bold text-white">400+</p>
                <p className="text-xs text-slate-300">Skilled Workforce</p>
              </div>
              <div className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-3">
                <p className="text-xl font-bold text-white">24x7</p>
                <p className="text-xs text-slate-300">Support Model</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
