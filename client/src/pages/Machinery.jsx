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
    <div className="font-sans">
      <HeroSection
        title="Our Machinery & Equipment"
        highlightText="Machinery"
        subtitle="We provide high-quality, well-maintained machinery for construction and industrial projects across India."
        buttonText="Inquire Now"
        buttonLink="/contact"
        videoSrc="/videos/machinery.mp4"
      />

      <div className="flex flex-wrap justify-center gap-3 py-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === cat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 md:grid-cols-3">
        {filteredMachines.map((machine) => (
          <MachineCard key={machine._id || machine.name} {...machine} />
        ))}
      </section>

      {filteredMachines.length === 0 ? (
        <div className="mx-auto mb-8 max-w-4xl rounded-xl border border-slate-300/30 bg-slate-100 px-4 py-3 text-center text-sm text-slate-700">
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
