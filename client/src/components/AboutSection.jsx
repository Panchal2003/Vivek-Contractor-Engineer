import { Building2, Cog, Hammer, ShieldCheck, Wrench } from "lucide-react";

const ICONS_MAP = {
  cog: Cog,
  wrench: Wrench,
  hammer: Hammer,
};

const COLOR_MAP = {
  blue: "text-cyan-200 bg-cyan-300/10 border-cyan-300/25",
  red: "text-orange-300 bg-orange-300/10 border-orange-300/25",
  purple: "text-violet-300 bg-violet-300/10 border-violet-300/25",
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
    <section className={`relative overflow-hidden bg-slate-950/70 py-20 sm:py-24 ${sectionClasses}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,116,144,0.2),transparent_45%),radial-gradient(circle_at_85%_40%,rgba(251,146,60,0.16),transparent_50%)]"></div>
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1c_1px,transparent_1px)] bg-[size:48px_48px]"></div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <article className="rounded-3xl border border-white/15 bg-slate-900/75 p-6 backdrop-blur-md sm:p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
            <Building2 className="h-4 w-4" />
            Company Profile
          </p>

          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {title} <span className="text-orange-300">{highlight}</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">{description}</p>
          <p className="mt-3 text-sm font-medium text-cyan-100">{subtitle}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => {
              const FeatureIcon = ICONS_MAP[feature.icon] || Cog;
              const colorClass = COLOR_MAP[feature.color] || COLOR_MAP.blue;

              return (
                <div key={feature.text} className={`flex items-center gap-3 rounded-xl border p-3 ${colorClass}`}>
                  <FeatureIcon size={iconSize} className="shrink-0" />
                  <p className="text-sm text-slate-100">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </article>

        <article className="relative overflow-hidden rounded-3xl border border-white/20 bg-slate-900/75 shadow-2xl">
          {videoSrc && (
            <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/55 to-slate-950/85"></div>
          <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-6 sm:p-8">
            <h3 className="text-2xl font-extrabold text-white">Execution Confidence</h3>
            <p className="mt-2 max-w-md text-sm text-slate-200">
              Structured planning, measurable quality checks, and field-tested manpower for high-impact infrastructure delivery.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-cyan-300/25 bg-cyan-400/10 p-3">
                <p className="text-xl font-extrabold text-white">120+</p>
                <p className="text-xs text-slate-200">Projects Delivered</p>
              </div>
              <div className="rounded-xl border border-orange-300/25 bg-orange-400/10 p-3">
                <p className="text-xl font-extrabold text-white">15+</p>
                <p className="text-xs text-slate-200">Years Experience</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-slate-900/65 p-3">
                <p className="text-xl font-extrabold text-white">400+</p>
                <p className="text-xs text-slate-200">Skilled Workforce</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-slate-900/65 p-3">
                <p className="text-xl font-extrabold text-white">24x7</p>
                <p className="text-xs text-slate-200">Support Model</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
