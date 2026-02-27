import { useEffect, useMemo, useState } from "react";
import HeroSection from "../components/HeroSection";
import PortfolioSection from "../components/PortfolioSection";
import CTASection from "../components/CTASection";
import { projectsAPI } from "../api/axios";

const fallbackProjects = [
  { title: "Luxury Villa, Uttar Pradesh", image: "/images/project1.jpg", category: "Residential", completed: true },
  { title: "Office Complex, Delhi", image: "/images/project2.jpg", category: "Commercial", completed: true },
  { title: "Shopping Mall, Mumbai", image: "/images/project3.jpg", category: "Commercial", completed: false },
];

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await projectsAPI.list();
        setProjects(data);
        setIsError(false);
      } catch {
        setProjects(fallbackProjects);
        setIsError(true);
      }
    };

    load();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(projects.map((project) => project.category).filter(Boolean));
    return ["All", "Completed", ...Array.from(unique)];
  }, [projects]);

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Completed") return Boolean(project.completed);
    return project.category === filter;
  });

  return (
    <div className="font-sans">
      <HeroSection
        title="Our Completed Projects"
        highlightText="Projects"
        subtitle="Explore a selection of our successful construction and engineering projects across India."
        buttonText="Contact Us"
        buttonLink="/contact"
        videoSrc="/videos/projects.mp4"
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

      <PortfolioSection
        projects={filteredProjects.map((project) => ({
          title: project.title,
          image: project.image || "/images/project1.jpg",
          description: project.description || "",
          category: project.category || "",
          location: project.location || "",
          completed: Boolean(project.completed),
        }))}
      />

      {filteredProjects.length === 0 ? (
        <div className="mx-auto mb-8 max-w-4xl rounded-xl border border-slate-300/30 bg-slate-100 px-4 py-3 text-center text-sm text-slate-700">
          {isError ? "Unable to load live projects." : "No projects available for this filter."}
        </div>
      ) : null}

      <CTASection
        title="Want Your Project Featured Here?"
        subtitle="Contact Vivek Contractor & Engineer to start your next project today."
        buttonText="Get a Free Quote"
        to="/contact"
      />
    </div>
  );
}
