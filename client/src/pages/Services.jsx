import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";

// Reusable Components
import WhyChooseUs from "../components/WhyChooseUs";
import ProcessSection from "../components/ProcessSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PortfolioSection from "../components/PortfolioSection";

export default function ServicePage() {
  // Sample data for reusable components
  const advantages = [
    "25+ Years of Experience",

    "On-time Project Delivery",
    "Cost-effective & Transparent Pricing",
    "Nationwide Service Coverage",
  ];

  const processSteps = [
    "Consultation & Planning",
    "Design & Approval",
    "Material Selection & Procurement",
    "Construction & Execution",
    "Quality Check & Handover",
  ];

  const testimonials = [
    { name: "Rohit Sharma", feedback: "Vivek Contractor & Engineer delivered my project on time with excellent quality and attention to detail." },
    { name: "Anjali Mehta", feedback: "Professional team, excellent project management and support throughout the process." },
  ];

  const portfolioProjects = [
    { title: "Luxury Villa, Uttar Pradesh", image: "/images/project1.jpg" },
    { title: "Office Complex, Delhi", image: "/images/project2.jpg" },
    { title: "Shopping Mall, Mumbai", image: "/images/project3.jpg" },
  ];

  const statsData = [
    { label: "Years Experience", value: 15, icon: "fa-solid fa-hard-hat", appendPlus: true },
    { label: "Projects Completed", value: 120, icon: "fa-solid fa-building", appendPlus: true },
    { label: "Happy Clients", value: 95, icon: "fa-solid fa-smile", appendPlus: true },
    { label: "Awards Won", value: 10, icon: "fa-solid fa-trophy", appendPlus: true },
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <HeroSection
        title="Premium Construction & Engineering Services"
        highlightText="Engineering"
        subtitle="Vivek Contractor & Engineer (VCE) provides high-quality construction and engineering solutions across India with over 25 years of experience."
        buttonText="Get a Free Quote"
        buttonLink="/contact"
        videoSrc="/videos/construction.mp4"
      />

      {/* Services Section */}
      <ServicesSection />

      {/* Stats / Experience */}
      <StatsSection statsData={statsData} />

      {/* Why Choose Us */}
      <WhyChooseUs points={advantages} />

      {/* Process / How We Work */}
      <ProcessSection steps={processSteps} />

      {/* Portfolio / Projects */}
      <PortfolioSection projects={portfolioProjects} />

      {/* Testimonials / Client Feedback */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Call To Action */}
      <CTASection
        title="Ready To Start Your Maintenance Project?"
        subtitle="Let’s build something extraordinary together."
        buttonText="Contact Us"
        to="/contact"
      />
    </div>
  );
}