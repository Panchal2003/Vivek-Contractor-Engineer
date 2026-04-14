import { useEffect, useMemo, useState } from "react";
import HeroSection from "../components/HeroSection";
import PortfolioSection from "../components/PortfolioSection";
import CTASection from "../components/CTASection";
import { projectsAPI } from "../api/axios";
import SITE_CONFIG from "../config/siteConfig";

const fallbackProjects = [
  { title: "Municipal Sewer Network, UP", image: "/images/project1.jpg", category: "Sewer Systems", completed: true, location: "Uttar Pradesh", value: "32 km" },
  { title: "Industrial Fire Safety, Delhi", image: "/images/project2.jpg", category: "Fire Lines", completed: true, location: "Delhi", value: "14 Facilities" },
  { title: "Water Treatment Plant, Mumbai", image: "/images/project3.jpg", category: "Water Utilities", completed: false, location: "Mumbai", value: "4 Plants" },
  { title: "Government Infrastructure Project", image: "/images/project4.jpg", category: "Government", completed: true, location: "Pan India", value: "10+ Contracts" },
  { title: "Commercial Complex, Gurgaon", image: "/images/project5.jpg", category: "Commercial", completed: true, location: "Gurgaon", value: "1.5L sq.ft" },
  { title: "Industrial Park, Bangalore", image: "/images/project6.jpg", category: "Industrial", completed: true, location: "Bangalore", value: "500 Acres" },
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
    return ["All", "Completed", "In Progress", ...Array.from(unique)];
  }, [projects]);

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Completed") return Boolean(project.completed);
    if (filter === "In Progress") return !project.completed;
    return project.category === filter;
  });

  const projectStats = [
    { value: "120+", label: "Projects Completed" },
    { value: "25+", label: "Years Experience" },
    { value: "98%", label: "On-Time Delivery" },
    { value: "10+", label: "Government Contracts" },
  ];

return (
    <div className='font-sans text-slate-900'>
      <HeroSection
        title='Our Projects'
        subtitle='Showcasing 120+ successful infrastructure projects including municipal sewer networks, industrial fire safety systems, and water treatment plants across India.'
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
            {projectStats.map((stat, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200/50 bg-white p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-amber-600">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600">Filter Portfolio</p>
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

      <PortfolioSection
        projects={filteredProjects.map((project) => ({
          title: project.title,
          image: project.image || "/images/project1.jpg",
          imageFit: project.imageFit || "cover",
          description: project.description || `Successfully completed ${project.title} with focus on quality and timely delivery.`,
          category: project.category || "",
          location: project.location || "",
          completed: Boolean(project.completed),
        }))}
      />

      {filteredProjects.length === 0 ? (
        <div className="mx-auto mb-8 mt-2 max-w-4xl rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm text-slate-600">
          {isError ? "Unable to load live projects." : "No projects available for this filter."}
        </div>
      ) : null}

      <CTASection
        title="Want Your Project Featured Here?"
        subtitle="Share your project details and let us help you build something extraordinary."
        buttonText="Get a Free Quote"
        to="/contact"
      />
    </div>
  );
}