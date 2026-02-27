import { useEffect, useState } from "react";
import { Settings2, Sparkles } from "lucide-react";
import ServiceCard from "./ServiceCard";
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
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(14,116,144,0.2),transparent_45%),radial-gradient(circle_at_88%_42%,rgba(251,146,60,0.15),transparent_48%)]"></div>
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1c_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
              <Sparkles className="h-4 w-4" />
              Service Portfolio
            </p>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              High-Performance <span className="text-orange-300">Engineering Services</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              We deliver technically sound infrastructure solutions with a focus on safety, durability, and execution quality at every stage.
            </p>
          </div>
          <div className="rounded-xl border border-white/15 bg-slate-900/70 p-3 text-slate-200">
            <Settings2 className="h-5 w-5 text-cyan-200" />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceCard
                key={service._id || service.title}
                icon={service.icon}
                title={service.title}
                desc={service.description}
                tag={service.tag}
              />
            ))
          ) : (
            <p className="col-span-full rounded-xl border border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
              No active services available right now.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
