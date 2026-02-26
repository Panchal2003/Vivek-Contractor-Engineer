import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import PortfolioSection from "../components/PortfolioSection";
import CTASection from "../components/CTASection";

export default function ProjectPage() {
  const [projects] = useState([
    { title: "Luxury Villa, Uttar Pradesh", image: "/images/project1.jpg", category: "Residential" },
    { title: "Office Complex, Delhi", image: "/images/project2.jpg", category: "Commercial" },
    { title: "Shopping Mall, Mumbai", image: "/images/project3.jpg", category: "Commercial" },
    { title: "Borewell Drilling Project", image: "/images/project4.jpg", category: "Industrial" },
  ]);

  // Optional filter logic
  const [filter, setFilter] = useState("All");
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <HeroSection
        title="Our Completed Projects"
        highlightText="Projects"
        subtitle="Explore a selection of our successful construction and engineering projects across India."
        buttonText="Contact Us"
        buttonLink="/contact"
        videoSrc="/videos/projects.mp4" // optional
      />

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 py-6">
        {["All", "Residential", "Commercial", "Industrial"].map((cat) => (
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

      {/* Portfolio Section */}
      <PortfolioSection projects={filteredProjects} />

      {/* CTA Section */}
      <CTASection
        title="Want Your Project Featured Here?"
        subtitle="Contact Vivek Contractor & Engineer to start your next project today."
        buttonText="Get a Free Quote"
        to="/contact"
      />
    </div>
  );
}