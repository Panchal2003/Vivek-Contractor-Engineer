import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import MachineCard from "../components/MachineCard";
import CTASection from "../components/CTASection";

export default function MachineryPage() {
  const [machines] = useState([
    { name: "Excavator", image: "/images/machine1.jpg", description: "Heavy duty earth moving excavator", category: "Construction" },
    { name: "Bulldozer", image: "/images/machine2.jpg", description: "Powerful bulldozer for site leveling", category: "Construction" },
    { name: "Borewell Drilling Machine", image: "/images/machine3.jpg", description: "Industrial grade drilling machine", category: "Drilling" },
    { name: "Concrete Mixer", image: "/images/machine4.jpg", description: "High capacity concrete mixer", category: "Industrial" },
  ]);

  // Optional category filter
  const [filter, setFilter] = useState("All");
  const filteredMachines = filter === "All" ? machines : machines.filter(m => m.category === filter);

  return (
    <div className="font-sans">

      {/* Hero Section */}
      <HeroSection
        title="Our Machinery & Equipment"
        highlightText="Machinery"
        subtitle="We provide high-quality, well-maintained machinery for construction and industrial projects across India."
        buttonText="Inquire Now"
        buttonLink="/contact"
        videoSrc="/videos/machinery.mp4"
      />

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 py-6">
        {["All", "Construction", "Drilling", "Industrial"].map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-semibold ${
              filter === cat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Machinery Grid */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 pb-16">
        {filteredMachines.map((machine, idx) => (
          <MachineCard key={idx} {...machine} />
        ))}
      </section>

      {/* CTA Section */}
      <CTASection
        title="Need Machinery for Your Project?"
        subtitle="Contact us today to rent or buy our machinery."
        buttonText="Get a Free Quote"
        to="/contact"
      />
    </div>
  );
}