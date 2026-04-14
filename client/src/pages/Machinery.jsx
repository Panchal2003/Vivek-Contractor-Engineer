import { useEffect, useMemo, useState } from "react";
import HeroSection from "../components/HeroSection";
import MachineCard from "../components/MachineCard";
import CTASection from "../components/CTASection";
import { machineryAPI } from "../api/axios";
import { CheckCircle2, Shield, Clock, Wrench } from "lucide-react";

const fallbackMachines = [
  { name: "Excavator - CAT 320", image: "/images/machine1.jpg", description: "Heavy duty hydraulic excavator with 20-ton operating weight. Ideal for large-scale excavation, demolition, and earthmoving projects.", category: "Earthmoving", status: "available", capacity: "20 Ton" },
  { name: "Bulldozer - Komatsu D65", image: "/images/machine2.jpg", description: "Powerful bulldozer with 170 HP engine. Perfect for site leveling, grading, and bulk earthwork operations.", category: "Earthmoving", status: "in-use", capacity: "170 HP" },
  { name: "Concrete Mixer Truck", image: "/images/machine3.jpg", description: "12 cubic meter capacity concrete mixer truck for on-site concrete delivery and casting.", category: "Concrete", status: "available", capacity: "12 m³" },
  { name: "Crane - 25 Ton", image: "/images/machine4.jpg", description: "Mobile crane with 25-ton lifting capacity for heavy material handling and structural installations.", category: "Lifting", status: "available", capacity: "25 Ton" },
  { name: "Drilling Rig", image: "/images/machine5.jpg", description: "Deep boring drilling rig for pile foundation work. Capable of drilling up to 30 meters depth.", category: "Drilling", status: "available", capacity: "30m Depth" },
  { name: "Tipper Truck", image: "/images/machine6.jpg", description: "10-wheeler tipper truck for material transportation. Ideal for sand, aggregate, and debris removal.", category: "Transportation", status: "available", capacity: "15 Ton" },
];

export default function MachineryPage() {
  const [machines, setMachines] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await machineryAPI.list();
        setMachines(data);
        setIsError(false);
      } catch {
        setMachines(fallbackMachines);
        setIsError(true);
      }
    };

    load();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(machines.map((machine) => machine.category).filter(Boolean));
    return ["All", "Available", "In-Use", ...Array.from(unique)];
  }, [machines]);

  const filteredMachines = filter === "All" 
    ? machines 
    : filter === "Available" 
      ? machines.filter(m => m.status === "available")
      : filter === "In-Use"
        ? machines.filter(m => m.status === "in-use")
        : machines.filter((machine) => machine.category === filter);

  const machineStats = [
    { icon: Wrench, value: "50+", label: "Machines Available" },
    { icon: Shield, value: "100%", label: "Well Maintained" },
    { icon: Clock, value: "24/7", label: "Operational Support" },
    { icon: CheckCircle2, value: "15+", label: "Years Experience" },
  ];

  const capabilities = [
    "Heavy earthmoving and excavation",
    "Concrete mixing and placement",
    "Deep foundation drilling",
    "Heavy lifting and material handling",
    "Site development and grading",
    "Debris removal and transportation",
  ];

return (
    <div className='font-sans text-slate-900'>
      <HeroSection
        title='Our Machinery'
        subtitle='Fleet of 50+ well-maintained machines including excavators, bulldozers, cranes, drilling rigs, and tipper trucks for heavy infrastructure projects.'
        buttonText='Contact Us'
        buttonLink='/contact'
        showStats={false}
      />

      <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 sm:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            {machineStats.map((stat, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200/50 bg-white p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <stat.icon className="mx-auto h-6 w-6 text-amber-500 mb-2" />
                <p className="text-2xl font-bold text-amber-600">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-xl border border-slate-200/50 bg-white p-4 shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700">{cap}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600">Filter Inventory</p>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Browse by category</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                    filter === cat
                      ? "border-amber-500 bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:text-amber-600"
                  }`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-8 sm:px-6 lg:grid-cols-3 lg:px-8">
        {filteredMachines.map((machine) => (
          <MachineCard 
            key={machine._id || machine.name} 
            image={machine.image}
            name={machine.name}
            description={machine.description}
            category={machine.category}
            status={machine.status}
          />
        ))}
      </section>

      {filteredMachines.length === 0 ? (
        <div className="mx-auto mb-8 max-w-4xl rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm text-slate-600">
          {isError ? "Unable to load live machinery list." : "No machinery available for this filter."}
        </div>
      ) : null}

      <CTASection
        title="Need Machinery for Your Project?"
        subtitle="We offer machinery rental and purchase options. Contact us for competitive pricing."
        buttonText="Get a Free Quote"
        to="/contact"
      />
    </div>
  );
}