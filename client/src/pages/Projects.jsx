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
    <div className="font-sans bg-slate-950 text-white">
      <HeroSection
        title="Our Completed Projects"
        highlightText="Projects"
        subtitle="Explore a selection of our successful construction and engineering projects across India."
        buttonText="Contact Us"
        buttonLink="/contact"
        videoSrc="/videos/projects.mp4"
      />

      <section className="relative border-y border-white/10 bg-slate-900/60 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Filter Portfolio</p>
            <h2 className="text-lg font-bold text-white sm:text-xl">Browse by category or completion status</h2>
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

      <PortfolioSection
        projects={filteredProjects.map((project) => ({
          title: project.title,
          image: project.image || "/images/project1.jpg",
          imageFit: project.imageFit || "cover",
          description: project.description || "",
          category: project.category || "",
          location: project.location || "",
          completed: Boolean(project.completed),
        }))}
      />

      {filteredProjects.length === 0 ? (
        <div className="mx-auto mb-12 mt-2 max-w-4xl rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-center text-sm text-slate-200">
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
