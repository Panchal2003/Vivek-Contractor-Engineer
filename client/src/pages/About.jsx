import { Eye, Target } from "lucide-react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <HeroSection
        title="About VCE M&I - Building India's Infrastructure"
        highlightText="VCE M&I"
        subtitle="Delivering high-quality infrastructure solutions across India with precision, compliance, and execution discipline."
        buttonText="Talk To Our Team"
        buttonLink="/contact"
        videoSrc="/videos/about-video.mp4"
      />

      <AboutSection
        title="Who We Are"
        subtitle="Engineering excellence with nationwide delivery capability."
        description="VCE Infra is a trusted contractor for sewer maintenance, fire line installation, water treatment, and heavy engineering works. We execute government and private projects with quality control, safety-first culture, and reliable timelines."
        features={[
          { icon: "wrench", text: "Sewer Line Maintenance", color: "blue" },
          { icon: "hammer", text: "Fire Line Installation", color: "red" },
          { icon: "cog", text: "Heavy Machinery & Drilling", color: "purple" },
        ]}
        videoSrc="/videos/about-map.mp4"
      />

      <section className="relative overflow-hidden bg-slate-950/70 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(14,116,144,0.2),transparent_45%),radial-gradient(circle_at_84%_32%,rgba(251,146,60,0.18),transparent_52%)]"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1c_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="rounded-3xl border border-cyan-300/25 bg-slate-900/80 p-6 backdrop-blur-md sm:p-8">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
              <Target className="h-4 w-4" />
              Our Mission
            </p>
            <h3 className="text-2xl font-extrabold text-white">Build Safe, Sustainable, High-Impact Infrastructure</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
              We deliver infrastructure projects with precision, safety, and environmental responsibility. Every execution plan is designed to maximize long-term value for clients, communities, and public systems.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Our mission is to combine engineering depth, disciplined project controls, and accountable execution so each project performs reliably from day one.
            </p>
          </article>

          <article className="rounded-3xl border border-orange-300/25 bg-slate-900/80 p-6 backdrop-blur-md sm:p-8">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-orange-200">
              <Eye className="h-4 w-4" />
              Our Vision
            </p>
            <h3 className="text-2xl font-extrabold text-white">Be India's Most Trusted Engineering Contractor</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
              We envision becoming the benchmark for reliability, innovation, and delivery excellence in infrastructure engineering across India.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Our long-term vision is to lead projects that strengthen public infrastructure resilience while raising quality and safety standards for the entire sector.
            </p>
          </article>
        </div>
      </section>

      <AboutSection
        title="Our Expertise"
        subtitle="Skilled workforce, modern tools, and execution-ready systems."
        description="VCE Infra combines technology, planning, and experienced site teams to execute complex projects on time and within budget. We maintain strict quality checks and practical, safety-led workflows at every stage."
        features={[
          { icon: "cog", text: "Sustainable Practices", color: "blue" },
          { icon: "hammer", text: "Innovative Engineering", color: "red" },
          { icon: "wrench", text: "Skilled Workforce", color: "purple" },
        ]}
        videoSrc="/videos/about-expertise1.mp4"
      />
    </div>
  );
}
