import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Clock,
  Flame,
  Hammer,
  Shield,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import CTASection from "../components/CTASection";
import SITE_CONFIG from "../config/siteConfig";

export default function Home() {
  const services = [
    {
      icon: Wrench,
      title: "Sewer Line Maintenance",
      desc: "Installation, rehabilitation, and preventive maintenance for sewer networks across urban and industrial zones.",
      color: "blue",
    },
    {
      icon: Flame,
      title: "Fire Line Installation",
      desc: "Fire pipeline routing, hydrant integration, and pressure-tested safety delivery systems.",
      color: "red",
    },
    {
      icon: Truck,
      title: "Heavy Machinery",
      desc: "Large-scale drilling, excavation, and civil support operations with modern equipment fleet.",
      color: "violet",
    },
  ];

  const strengths = [
    {
      icon: Shield,
      title: "Safety First",
      desc: "ISO-certified safety protocols with daily inspections and PPE enforcement on every site.",
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      desc: "Milestone-based execution with disciplined reporting and risk mitigation strategies.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      desc: "Structured quality checks at every phase ensuring compliance with international standards.",
    },
    {
      icon: Users,
      title: "Expert Team",
      desc: "400+ skilled professionals with experienced engineering leadership and trained site teams.",
    },
  ];

  const projects = [
    {
      title: "Municipal Sewer Network",
      value: "32 km",
      category: "Sewer Systems",
      desc: "Trunk and branch sewer lines with chamber upgrades across urban zones.",
    },
    {
      title: "Industrial Fire Safety",
      value: "14 Facilities",
      category: "Fire Lines",
      desc: "High-capacity ring-main fire pipeline deployment with testing support.",
    },
    {
      title: "Water Treatment Plants",
      value: "4 Plants",
      category: "Water Utilities",
      desc: "Pumping, filtration, and treatment works for continuous reliability.",
    },
  ];

  const processSteps = [
    { step: "01", title: "Discovery", desc: "Technical survey, BOQ study, and execution roadmap" },
    { step: "02", title: "Planning", desc: "Method statements, safety planning, and scheduling" },
    { step: "03", title: "Execution", desc: "Resource mobilization, quality checks, and implementation" },
    { step: "04", title: "Handover", desc: "Commissioning, documentation, and client walkthrough" },
  ];

  const sectors = [
    "Municipal Utilities",
    "Industrial Parks",
    "Government Infrastructure",
    "Commercial Developments",
    "Logistics & Warehousing",
    "Public Safety Networks",
  ];

  return (
    <div className="overflow-hidden text-slate-900">
<HeroSection
        title='Engineering Excellence'
        subtitle='Leading infrastructure contractor specializing in sewer systems, fire line installations, and water utility infrastructure across India since 2000.'
        buttonText='Get a Quote'
        buttonLink='/contact'
        secondaryText='View Projects'
        secondaryLink='/projects'
        showStats={true}
      />

      <AboutSection
        title="About"
        highlight={SITE_CONFIG.pages.home.heroHighlight}
        description="VCE is a trusted contractor delivering high-quality sewer systems, fire line installations, and heavy engineering projects across India with precision and safety."
        features={[
          { icon: "wrench", color: "blue", text: "Government Projects" },
          { icon: "cog", color: "red", text: "Advanced Machinery" },
          { icon: "hammer", color: "purple", text: "On-Time Delivery" },
          { icon: "wrench", color: "red", text: "ISO Safety Compliant" },
        ]}
        videoSrc="/videos/about-video.mp4"
      />

      <section className="relative bg-slate-50 py-12 sm:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal mb-8 text-center">
            <p className="scroll-reveal mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 border border-amber-200/50">
              <Wrench className="h-3.5 w-3.5" />
              Our Services
            </p>
            <h2 className="scroll-reveal scroll-reveal-delay-1 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Infrastructure Solutions</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, idx) => (
              <article key={service.title} className="scroll-reveal group relative rounded-2xl border border-slate-200/50 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`relative mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${
                  service.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  service.color === 'red' ? 'from-red-500 to-red-600' :
                  'from-violet-500 to-violet-600'
                } text-white shadow-lg shadow-blue-500/25`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="relative text-lg font-bold text-slate-900">{service.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-500">{service.desc}</p>
                <a href="/services" className="relative mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 sm:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="scroll-reveal mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-700 border border-violet-200/50">
                <Shield className="h-3.5 w-3.5" />
                Why Choose Us
              </p>
              <h2 className="scroll-reveal scroll-reveal-delay-1 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Core Strengths</h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((item, idx) => (
              <article key={item.title} className="scroll-reveal group relative rounded-2xl border border-slate-200/50 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="relative text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-slate-50 py-12 sm:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="scroll-reveal mb-2 text-xs font-bold uppercase tracking-widest text-orange-600">Portfolio</p>
              <h2 className="scroll-reveal scroll-reveal-delay-1 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Featured Projects</h2>
            </div>
            <a href="/projects" className="scroll-reveal inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, idx) => (
              <article key={project.title} className="scroll-reveal group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="relative p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-600 group-hover:text-amber-100">{project.category}</p>
                  <p className="mt-1 text-xl font-bold text-slate-900 group-hover:text-white">{project.value}</p>
                  <h3 className="mt-2 text-base font-bold text-slate-900 group-hover:text-white">{project.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500 group-hover:text-amber-50">{project.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 sm:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal mb-8 text-center">
            <p className="scroll-reveal mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 border border-emerald-200/50">
              <Clock className="h-3.5 w-3.5" />
              Our Process
            </p>
            <h2 className="scroll-reveal scroll-reveal-delay-1 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">How We Execute</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {processSteps.map((step, idx) => (
              <article key={step.step} className="scroll-reveal group relative rounded-2xl border border-slate-200/50 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-sm font-bold text-white shadow-lg shadow-emerald-500/25">{step.step}</span>
                <h3 className="relative mt-3 text-base font-bold text-slate-900">{step.title}</h3>
                <p className="relative mt-1 text-sm leading-relaxed text-slate-500">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-slate-50 py-12 sm:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="scroll-reveal rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <h3 className="text-xl font-bold text-slate-900">Sectors We Serve</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {sectors.map((sector) => (
                <p key={sector} className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-amber-50 hover:border-amber-200">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  {sector}
                </p>
              ))}
            </div>
          </article>

          <article className="scroll-reveal scroll-reveal-delay-2 rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <h3 className="text-xl font-bold text-slate-900">Why Clients Trust Us</h3>
            <div className="mt-4 space-y-2">
              {[
                "Transparent commercial proposals",
                "Multi-site deployment",
                "Experienced engineering leadership",
                "Consistent quality audits",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-lg bg-slate-50 p-2.5 transition-colors hover:bg-amber-50/50">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  </div>
                  <p className="text-sm text-slate-600">{point}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <CTASection
        title="Ready For Your Next Project?"
        subtitle="Share your scope, drawings, or tender details. Our team will provide a practical execution strategy with timelines."
        buttonText="Start Project Discussion"
        to="/contact"
      />
    </div>
  );
}