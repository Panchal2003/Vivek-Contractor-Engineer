import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import WhyChooseUs from "../components/WhyChooseUs";
import ProcessSection from "../components/ProcessSection";
import ServiceCard from "../components/ServiceCard";
import { servicesAPI } from "../api/axios";
import SITE_CONFIG from "../config/siteConfig";

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
  const statsData = [
    { label: "Years Experience", value: 25, icon: "fa-solid fa-hard-hat", appendPlus: true },
    { label: "Projects Completed", value: 120, icon: "fa-solid fa-building", appendPlus: true },
    { label: "Happy Clients", value: 95, icon: "fa-solid fa-smile", appendPlus: true },
    { label: "Awards Won", value: 10, icon: "fa-solid fa-trophy", appendPlus: true },
  ];

return (
    <div className='font-sans'>
      <HeroSection
        title='Our Services'
        subtitle='Comprehensive engineering solutions for sewer systems, fire line installations, water utilities, and heavy infrastructure projects across India.'
        buttonText='Contact Us'
        buttonLink='/contact'
        showStats={false}
      />

      <section className="relative overflow-hidden py-12 sm:py-16 bg-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-orange-600">Services</p>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Our Engineering Services</h2>
          </div>
          
          <div className="grid gap-5 md:grid-cols-3">
            {serviceItems.map((service) => (
              <ServiceCard key={service._id || service.title} icon={service.icon} title={service.title} desc={service.description} tag={service.tag} />
            ))}
          </div>
          {serviceItems.length === 0 ? (
            <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              {isError ? "Unable to load live services. Showing fallback if available." : "No active services available right now."}
            </p>
          ) : null}
        </div>
      </section>

      <StatsSection statsData={statsData} />
      <WhyChooseUs points={advantages} />
      <ProcessSection steps={processSteps} />

      <CTASection title="Ready To Start Your Maintenance Project?" subtitle="Let's build something extraordinary together." buttonText="Contact Us" to="/contact" />
    </div>
  );
}