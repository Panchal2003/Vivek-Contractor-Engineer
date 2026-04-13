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
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 sm:py-16 text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Our Process</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">
          A practical workflow that keeps delivery predictable, auditable, and quality controlled.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {displaySteps.map((step, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <article key={idx} className="rounded-xl border border-slate-200/50 bg-white p-4 text-left shadow-sm hover:shadow-md transition">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-orange-600">Step {idx + 1}</p>
                <Icon className="mb-2 h-6 w-6 text-amber-600" />
                <p className="text-sm leading-relaxed text-slate-600">{step}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}