import { useEffect, useMemo, useState } from "react";
import HeroSection from "../components/HeroSection";
import MachineCard from "../components/MachineCard";
import CTASection from "../components/CTASection";
import { machineryAPI } from "../api/axios";

const fallbackMachines = [
  { name: "Excavator", image: "/images/machine1.jpg", description: "Heavy duty earth moving excavator", category: "Construction", status: "available" },
  { name: "Bulldozer", image: "/images/machine2.jpg", description: "Powerful bulldozer for site leveling", category: "Construction", status: "in-use" },
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
    return ["All", ...Array.from(unique)];
  }, [machines]);

  const filteredMachines = filter === "All" ? machines : machines.filter((machine) => machine.category === filter);

  return (
    <div className="font-sans bg-slate-950 text-white">
      <HeroSection
        title="Our Machinery & Equipment"
        highlightText="Machinery"
        subtitle="We provide high-quality, well-maintained machinery for construction and industrial projects across India."
        buttonText="Inquire Now"
        buttonLink="/contact"
        videoSrc="/videos/machinery.mp4"
      />

      <section className="relative border-y border-white/10 bg-slate-900/60 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Filter Inventory</p>
            <h2 className="text-lg font-bold text-white sm:text-xl">Find machinery by category</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  filter === cat
                    ? "border-cyan-300 bg-cyan-300 text-slate-950"
                    : "border-white/20 bg-white/5 text-slate-200 hover:border-cyan-200/40 hover:text-white"
                }`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        {filteredMachines.map((machine) => (
          <MachineCard key={machine._id || machine.name} {...machine} />
        ))}
      </section>

      {filteredMachines.length === 0 ? (
        <div className="mx-auto mb-12 max-w-4xl rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-center text-sm text-slate-200">
          {isError ? "Unable to load live machinery list." : "No machinery available for this filter."}
        </div>
      ) : null}

      <CTASection
        title="Need Machinery for Your Project?"
        subtitle="Contact us today to rent or buy our machinery."
        buttonText="Get a Free Quote"
        to="/contact"
      />
    </div>
  );
}
