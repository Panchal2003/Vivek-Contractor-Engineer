import { Eye, Target } from "lucide-react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import CTASection from "../components/CTASection";
import SITE_CONFIG from "../config/siteConfig";

export default function About() {
  return (
    <div className="text-slate-900">
<HeroSection
        title='About Us'
        subtitle='Trusted infrastructure contractor with 25+ years of experience in sewer systems, fire line installations, and water utility projects across India.'
        buttonText='Contact Us'
        buttonLink='/contact'
        showStats={false}
      />

      <AboutSection
        title="Who We Are"
        subtitle="Engineering excellence with nationwide delivery capability."
        description={`${SITE_CONFIG.company.name} is a trusted contractor for sewer maintenance, fire line installation, water treatment, and heavy engineering works. We execute government and private projects with quality control, safety-first culture, and reliable timelines.`}
        features={[
          { icon: "wrench", text: "Sewer Line Maintenance", color: "blue" },
          { icon: "hammer", text: "Fire Line Installation", color: "red" },
          { icon: "cog", text: "Heavy Machinery & Drilling", color: "purple" },
        ]}
        videoSrc="/videos/about-map.mp4"
      />

      <section className="relative overflow-hidden bg-white py-12 sm:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/2 right-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="rounded-2xl border border-slate-200/50 bg-white p-5 shadow-lg sm:p-6">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700 border border-amber-200/50">
              <Target className="h-3.5 w-3.5" />
              Our Mission
            </p>
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">Build Safe, Sustainable, High-Impact Infrastructure</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We deliver infrastructure projects with precision, safety, and environmental responsibility. Every execution plan is designed to maximize long-term value for clients, communities, and public systems.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Our mission is to combine engineering depth, disciplined project controls, and accountable execution so each project performs reliably from day one.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200/50 bg-white p-5 shadow-lg sm:p-6">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-700 border border-violet-200/50">
              <Eye className="h-3.5 w-3.5" />
              Our Vision
            </p>
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">Be India's Most Trusted Engineering Contractor</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We envision becoming the benchmark for reliability, innovation, and delivery excellence in infrastructure engineering across India.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Our long-term vision is to lead projects that strengthen public infrastructure resilience while raising quality and safety standards for the entire sector.
            </p>
          </article>
        </div>
      </section>

      <AboutSection
        title="Our Expertise"
        subtitle="Skilled workforce, modern tools, and execution-ready systems."
        description={`${SITE_CONFIG.company.name} combines technology, planning, and experienced site teams to execute complex projects on time and within budget. We maintain strict quality checks and practical, safety-led workflows at every stage.`}
        features={[
          { icon: "cog", text: "Sustainable Practices", color: "blue" },
          { icon: "hammer", text: "Innovative Engineering", color: "red" },
          { icon: "wrench", text: "Skilled Workforce", color: "purple" },
        ]}
        videoSrc="/videos/about-expertise1.mp4"
      />

      <CTASection
        title="Ready To Partner With Us?"
        subtitle="Let's build world-class infrastructure together."
        buttonText="Contact Us"
        to="/contact"
      />
    </div>
  );
}