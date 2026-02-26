import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Handshake,
  HardHat,
  Landmark,
  MapPinned,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Truck,
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";

export default function Home() {
  const capabilityCards = [
    {
      icon: FileCheck2,
      title: "End-to-End Project Control",
      text: "From planning and approvals to execution and commissioning with full compliance tracking.",
    },
    {
      icon: ShieldCheck,
      title: "Safety-First Execution",
      text: "Structured site SOPs, PPE enforcement, and daily quality-safety inspections.",
    },
    {
      icon: HardHat,
      title: "Heavy Infrastructure Expertise",
      text: "Sewer lines, fire pipelines, treatment systems, and civil utility packages.",
    },
    {
      icon: TimerReset,
      title: "On-Time Delivery System",
      text: "Milestone-based planning, disciplined reporting, and quick risk mitigation.",
    },
  ];

  const projects = [
    {
      icon: Landmark,
      title: "Municipal Sewer Rehabilitation",
      value: "32 km Network",
      desc: "Execution of trunk and branch sewer lines with chamber upgrades across urban zones.",
    },
    {
      icon: Building2,
      title: "Industrial Fire Line Integration",
      value: "14 Facilities",
      desc: "High-capacity ring-main fire pipeline deployment with pressure-tested safety delivery.",
    },
    {
      icon: Factory,
      title: "Water Utility Upgradation",
      value: "4 Plants",
      desc: "Pumping, filtration, and treatment support works for continuous utility reliability.",
    },
  ];

  const process = [
    { icon: BriefcaseBusiness, title: "Discovery", text: "Technical survey, BOQ study, and execution roadmap." },
    { icon: ClipboardCheck, title: "Engineering", text: "Method statements, safety planning, and scheduling baseline." },
    { icon: Truck, title: "Execution", text: "Resource mobilization, quality checks, and controlled implementation." },
    { icon: Handshake, title: "Handover", text: "Commissioning support, documentation, and client walkthrough." },
  ];

  const sectors = [
    "Municipal Utilities",
    "Industrial Parks",
    "Government Infrastructure",
    "Commercial Developments",
    "Logistics & Warehousing",
    "Public Safety Networks",
  ];

  const trustPoints = [
    { icon: CircleDollarSign, text: "Transparent commercial proposals with clear scope mapping." },
    { icon: MapPinned, text: "Multi-site deployment capability with centralized supervision." },
    { icon: Award, text: "Experienced engineering leadership and trained site teams." },
    { icon: CheckCircle2, text: "Consistent quality audits and closure-ready documentation." },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,0,0.15),transparent_40%)] animate-pulse-slow"></div>

      <HeroSection
        title="Engineering The Future With Precision"
        highlightText="Precision"
        subtitle="Sewer Networks, Fire Line Infrastructure, Water Utility Systems, Heavy Machinery Support, and Government Contracts."
        buttonText="Explore Live Portfolio"
        buttonLink="#projects"
        videoSrc="/videos/home-video.mp4"
      />

      <AboutSection
        title="About"
        highlight="VCE"
        description="VCE is a trusted infrastructure contractor delivering high-quality sewer systems, fire line installations, and heavy engineering projects across India with precision and safety."
        features={[
          { icon: "wrench", color: "blue", animation: "animate-bounceSoft", text: "Government Infrastructure Projects" },
          { icon: "cog", color: "red", animation: "animate-rotateSlow", text: "Advanced Machinery & Skilled Engineers" },
          { icon: "hammer", color: "purple", animation: "animate-swing", text: "On-Time Project Delivery" },
          { icon: "wrench", color: "red", animation: "animate-bounceSoft", text: "ISO Standard Safety Compliance" },
        ]}
        videoSrc="/videos/about-video.mp4"
      />

      <ServicesSection />

      <StatsSection
        statsData={[
          { icon: "fa-solid fa-briefcase", label: "Years Experience", value: 15, appendPlus: true },
          { icon: "fa-solid fa-check-double", label: "Projects Completed", value: 120 },
          { icon: "fa-solid fa-helmet-safety", label: "Skilled Workers", value: 400 },
          { icon: "fa-solid fa-landmark", label: "Government Contracts", value: 10 },
        ]}
        floatElements={[
          { position: "-top-20 -left-20", size: "w-48 h-48", bgColor: "bg-red-500/20", animation: "animate-float-slow" },
          { position: "-bottom-20 -right-20", size: "w-72 h-72", bgColor: "bg-yellow-400/20", animation: "animate-float-delay" },
        ]}
      />

      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
                <Sparkles className="h-4 w-4" />
                Core Strengths
              </p>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Why Professional Teams Choose VCE</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilityCards.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/15 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-200/40">
                <item.icon className="mb-3 h-9 w-9 rounded-xl bg-cyan-300/10 p-2 text-cyan-200" />
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative bg-slate-950/60 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Portfolio Highlights</h2>
            <a href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-300 hover:text-orange-200">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                <project.icon className="mb-4 h-10 w-10 text-orange-300" />
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">{project.value}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-extrabold text-white sm:text-4xl">Execution Framework</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {process.map((step, idx) => (
              <article key={step.title} className="rounded-2xl border border-white/15 bg-slate-900/70 p-5">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-orange-300">Step {idx + 1}</p>
                <step.icon className="mb-3 h-8 w-8 text-cyan-200" />
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-slate-950/55 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-3xl border border-white/15 bg-slate-900/70 p-6 sm:p-8">
            <h3 className="text-2xl font-extrabold text-white">Sectors We Serve</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {sectors.map((sector) => (
                <p key={sector} className="rounded-xl border border-cyan-200/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-100">
                  {sector}
                </p>
              ))}
            </div>
          </article>
          <article className="rounded-3xl border border-white/15 bg-slate-900/70 p-6 sm:p-8">
            <h3 className="text-2xl font-extrabold text-white">Client Confidence Factors</h3>
            <div className="mt-5 space-y-3">
              {trustPoints.map((item) => (
                <div key={item.text} className="flex gap-3 rounded-xl bg-white/5 p-3">
                  <item.icon className="mt-1 h-5 w-5 shrink-0 text-orange-300" />
                  <p className="text-sm text-slate-200">{item.text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="contact" className="relative px-4 pb-20 sm:px-6 lg:px-8 mt-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-cyan-200/25 bg-slate-900/75 p-6 text-center sm:p-10">
          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">Ready For Your Next Infrastructure Milestone?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Share your scope, drawings, or tender details. Our team will provide a practical execution strategy with timelines and resource planning.
          </p>
          <a href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
            Start Project Discussion
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
