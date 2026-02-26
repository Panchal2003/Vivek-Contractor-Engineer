import { ClipboardCheck, ScanSearch, Truck, Wrench } from "lucide-react";

export default function ProcessSection({ steps = [] }) {
  const icons = [ScanSearch, ClipboardCheck, Truck, Wrench];
  const displaySteps =
    steps.length > 0
      ? steps
      : [
          "Site survey, requirement analysis, and project scope freeze.",
          "Execution planning with safety method statements and timelines.",
          "Resource mobilization and monitored on-site implementation.",
          "Testing, quality closure, and final handover support.",
        ];

  return (
    <section className="relative overflow-hidden bg-slate-950/60 py-20 sm:py-24 text-center">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1c_1px,transparent_1px)] bg-[size:48px_48px]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Process</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          A practical workflow that keeps delivery predictable, auditable, and quality controlled.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {displaySteps.map((step, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <article key={idx} className="rounded-2xl border border-white/15 bg-slate-900/75 p-5 text-left backdrop-blur-sm">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-orange-300">Step {idx + 1}</p>
                <Icon className="mb-3 h-8 w-8 text-cyan-200" />
                <p className="text-sm leading-relaxed text-slate-200">{step}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
