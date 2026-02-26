import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  CircleGauge,
  Drill,
  HardHat,
  Pickaxe,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export default function HeroSection({
  title,
  highlightText = "",
  subtitle = "",
  buttonText = "",
  buttonLink = "#",
  videoSrc = "",
}) {
  const floatingTools = [
    { icon: Wrench, label: "Maintenance", className: "top-[16%] left-[8%] animate-float-slow" },
    { icon: Drill, label: "Drilling", className: "top-[24%] right-[9%] animate-float-delay" },
    { icon: HardHat, label: "Safety", className: "top-[68%] left-[5%] animate-float" },
    { icon: Pickaxe, label: "Infrastructure", className: "top-[72%] right-[8%] animate-float-slow" },
    { icon: CircleGauge, label: "Quality", className: "top-[10%] left-[46%] animate-float-delay" },
  ];

  const highlights = [
    { icon: Award, text: "15+ Years Industry Track Record" },
    { icon: ShieldCheck, text: "ISO-Aligned Safety Practices" },
    { icon: Building2, text: "Government & Private Contracts" },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(14,116,144,0.35),transparent_48%),radial-gradient(circle_at_82%_20%,rgba(180,83,9,0.35),transparent_52%)]"></div>

      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pb-14 pt-28 sm:px-6 md:pt-32 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-900/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur">
              <BadgeCheck className="h-4 w-4" />
              Trusted Engineering Partner
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              {typeof title === "string" && highlightText && title.includes(highlightText) ? (
                <>
                  {title.split(highlightText)[0]}
                  <span className="text-orange-400">{highlightText}</span>
                  {title.split(highlightText)[1]}
                </>
              ) : (
                title
              )}
            </h1>

            {subtitle && (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
                {subtitle}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {buttonText && buttonLink && (
                <a
                  href={buttonLink}
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-orange-400"
                >
                  {buttonText}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
              {/* <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
              >
                Request Consultation
              </a> */}
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.text}
                  className="rounded-2xl border border-white/15 bg-slate-900/60 p-4 backdrop-blur-sm"
                >
                  <item.icon className="mb-2 h-5 w-5 text-cyan-300" />
                  <p className="text-xs leading-relaxed text-slate-200">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/20 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-md sm:p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                Delivery Performance
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4">
                  <p className="text-2xl font-bold text-white">120+</p>
                  <p className="mt-1 text-xs text-slate-300">Executed Projects</p>
                </div>
                <div className="rounded-2xl border border-orange-300/20 bg-orange-400/10 p-4">
                  <p className="text-2xl font-bold text-white">400+</p>
                  <p className="mt-1 text-xs text-slate-300">Skilled Workforce</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-slate-800/70 p-4">
                  <p className="text-2xl font-bold text-white">98%</p>
                  <p className="mt-1 text-xs text-slate-300">On-time Completion</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-slate-800/70 p-4">
                  <p className="text-2xl font-bold text-white">24x7</p>
                  <p className="mt-1 text-xs text-slate-300">Site Coordination</p>
                </div>
              </div>
            </div>

            {floatingTools.map((tool) => (
              <div
                key={tool.label}
                className={`pointer-events-none absolute hidden rounded-full border border-white/20 bg-slate-900/80 px-3 py-2 text-[11px] font-semibold text-cyan-100 backdrop-blur md:flex md:items-center md:gap-2 ${tool.className}`}
              >
                <tool.icon className="h-4 w-4 text-orange-300" />
                {tool.label}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/70">
            <div className="mt-2 h-3 w-1 rounded-full bg-white animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
