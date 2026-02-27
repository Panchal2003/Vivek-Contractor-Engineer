import { useEffect, useState } from "react";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "../components/ContactForm";
import HeroSection from "../components/HeroSection";
import { inquiriesAPI, servicesAPI } from "../api/axios";

export default function ContactPage() {
  const [serviceOptions, setServiceOptions] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await servicesAPI.list();
        setServiceOptions(data.filter((item) => item.isActive).map((item) => item.title));
      } catch {
        setServiceOptions([]);
      }
    };

    loadServices();
  }, []);

  const handleFormSubmit = async (data) => {
    await inquiriesAPI.create(data);
  };

  const contactCards = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 92661 15666",
      sub: "Mon - Sat, 9:00 AM to 7:00 PM",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@vceinfra.in",
      sub: "For tenders and project proposals",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "India",
      sub: "Serving projects across regions",
    },
    {
      icon: Clock3,
      title: "Response SLA",
      value: "Within 24 Hours",
      sub: "Engineering team review included",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <HeroSection
        title="Get In Touch With Our Engineering Team"
        highlightText="Engineering"
        subtitle="Share your project scope and timelines. We provide practical execution plans, resource guidance, and commercial clarity."
        buttonText="Submit Inquiry"
        buttonLink="#contact-form"
        videoSrc="/videos/about-video.mp4"
      />

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(14,116,144,0.2),transparent_45%),radial-gradient(circle_at_86%_26%,rgba(251,146,60,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1c_1px,transparent_1px)] bg-[size:48px_48px]"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Contact & Project Inquiry</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Discuss new projects, maintenance contracts, or tender-based execution requirements with our team.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-white/15 bg-slate-900/80 p-5 backdrop-blur-sm">
                <card.icon className="mb-3 h-6 w-6 text-cyan-200" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-300">{card.title}</p>
                <p className="mt-1 text-lg font-bold text-white">{card.value}</p>
                <p className="mt-1 text-xs text-slate-300">{card.sub}</p>
              </article>
            ))}
          </div>

          <div id="contact-form" className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <ContactForm onSubmit={handleFormSubmit} serviceOptions={serviceOptions} />

            <article className="rounded-3xl border border-white/15 bg-slate-900/80 p-6 backdrop-blur-md sm:p-8">
  <h3 className="text-2xl font-extrabold text-white">
    What To Share For Fastest Response
  </h3>

  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
    <li>1. Project type and location details.</li>
    <li>2. Approximate execution timeline.</li>
    <li>3. Drawings/BOQ status and approvals.</li>
    <li>4. Any safety, compliance, or tender constraints.</li>
  </ul>

  <div className="mt-6 rounded-2xl border border-cyan-300/25 bg-cyan-400/10 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
      Need Immediate Discussion?
    </p>
    <p className="mt-1 text-sm text-slate-200">
      Call <span className="font-bold text-white">+91 92661 15666</span> for urgent site or tender coordination.
    </p>
  </div>

  {/* Google Map */}
  <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
    <iframe
      src="https://www.google.com/maps?q=Delhi,India&output=embed"
      width="100%"
      height="250"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Company Location"
      className="rounded-2xl"
    ></iframe>
  </div>
</article>
          </div>
        </div>
      </section>
    </div>
  );
}
