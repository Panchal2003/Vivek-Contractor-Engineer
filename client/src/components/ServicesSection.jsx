import { useEffect, useState } from "react";
import { ArrowRight, Settings2, Sparkles } from "lucide-react";
import { servicesAPI } from "../api/axios";

const fallbackServices = [
  {
    title: "Sewer Line Maintenance",
    description: "Installation, rehabilitation, and preventive maintenance for municipal and industrial sewer networks.",
    icon: "fa-solid fa-water",
    tag: "Utility Networks",
  },
  {
    title: "Fire Line Installation",
    description: "Complete fire pipeline routing, hydrant integration, and testing support for compliance-ready safety systems.",
    icon: "fa-solid fa-fire-flame-curved",
    tag: "Fire Safety",
  },
  {
    title: "Heavy Drilling & Civil Support",
    description: "Large-scale drilling, utility trenching, and equipment-backed field operations for critical infrastructure.",
    icon: "fa-solid fa-screwdriver-wrench",
    tag: "Heavy Execution",
  },
];

export default function ServicesSection() {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await servicesAPI.list();
        setServices(data.filter((item) => item.isActive));
      } catch {
        setServices(fallbackServices);
      }
    };

    load();
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-700">
              <Sparkles className="h-4 w-4" />
              Service Portfolio
            </p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              High-Performance <span className="text-blue-600">Engineering Services</span>
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              We deliver technically sound infrastructure solutions with a focus on safety, durability, and execution quality at every stage.
            </p>
          </div>
          <div className="hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:block">
            <Settings2 className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.length > 0 ? (
            services.map((service, index) => (
              <article
                key={service._id || service.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-orange-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative z-10">
                  <p className="mb-3 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-slate-600">
                    {service.tag || `Service ${index + 1}`}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{service.description}</p>
                  <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="col-span-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              No active services available right now.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
