import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import WhyChooseUs from "../components/WhyChooseUs";
import ProcessSection from "../components/ProcessSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ServiceCard from "../components/ServiceCard";
import { servicesAPI } from "../api/axios";

const fallbackServices = [
  {
    title: "Sewer Line Maintenance",
    description: "Installation, rehabilitation, and preventive maintenance for sewer networks.",
    icon: "fa-solid fa-water",
    tag: "Utility Networks",
  },
  {
    title: "Fire Line Installation",
    description: "Fire pipeline routing, hydrant integration, and testing support.",
    icon: "fa-solid fa-fire-flame-curved",
    tag: "Fire Safety",
  },
  {
    title: "Heavy Drilling & Civil Support",
    description: "Large-scale drilling and field operations for infrastructure projects.",
    icon: "fa-solid fa-screwdriver-wrench",
    tag: "Heavy Execution",
  },
];

export default function ServicePage() {
  const [serviceItems, setServiceItems] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await servicesAPI.list();
        setServiceItems(data.filter((item) => item.isActive));
        setIsError(false);
      } catch {
        setServiceItems(fallbackServices);
        setIsError(true);
      }
    };

    load();
  }, []);

  const advantages = ["25+ Years of Experience", "On-time Project Delivery", "Cost-effective & Transparent Pricing", "Nationwide Service Coverage"];
  const processSteps = ["Consultation & Planning", "Design & Approval", "Material Selection & Procurement", "Construction & Execution", "Quality Check & Handover"];
  const testimonials = [
    { name: "Rohit Sharma", feedback: "Vivek Contractor & Engineer delivered my project on time with excellent quality and attention to detail." },
    { name: "Anjali Mehta", feedback: "Professional team, excellent project management and support throughout the process." },
  ];
  const statsData = [
    { label: "Years Experience", value: 15, icon: "fa-solid fa-hard-hat", appendPlus: true },
    { label: "Projects Completed", value: 120, icon: "fa-solid fa-building", appendPlus: true },
    { label: "Happy Clients", value: 95, icon: "fa-solid fa-smile", appendPlus: true },
    { label: "Awards Won", value: 10, icon: "fa-solid fa-trophy", appendPlus: true },
  ];

  return (
    <div className="font-sans">
      <HeroSection
        title="Premium Construction & Engineering Services"
        highlightText="Engineering"
        subtitle="Vivek Contractor & Engineer (VCE) provides high-quality construction and engineering solutions across India with over 25 years of experience."
        buttonText="Get a Free Quote"
        buttonLink="/contact"
        videoSrc="/videos/construction.mp4"
      />

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(14,116,144,0.2),transparent_45%),radial-gradient(circle_at_88%_42%,rgba(251,146,60,0.15),transparent_48%)]"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1c_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {serviceItems.map((service) => (
              <ServiceCard key={service._id || service.title} icon={service.icon} title={service.title} desc={service.description} tag={service.tag} />
            ))}
          </div>
          {serviceItems.length === 0 ? (
            <p className="mt-4 rounded-xl border border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
              {isError ? "Unable to load live services. Showing fallback if available." : "No active services available right now."}
            </p>
          ) : null}
        </div>
      </section>

      <StatsSection statsData={statsData} />
      <WhyChooseUs points={advantages} />
      <ProcessSection steps={processSteps} />
      <TestimonialsSection testimonials={testimonials} />

      <CTASection title="Ready To Start Your Maintenance Project?" subtitle="Lets build something extraordinary together." buttonText="Contact Us" to="/contact" />
    </div>
  );
}
