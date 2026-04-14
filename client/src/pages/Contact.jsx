import { useEffect, useState } from "react";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import HeroSection from "../components/HeroSection";
import ContactForm from "../components/ContactForm";
import { inquiriesAPI, servicesAPI } from "../api/axios";
import SITE_CONFIG from "../config/siteConfig";

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
      value: SITE_CONFIG.contact.phone,
      sub: "Mon - Sat, 9:00 AM to 7:00 PM",
    },
    {
      icon: Mail,
      title: "Email",
      value: SITE_CONFIG.contact.email,
      sub: "For tenders and project proposals",
    },
    {
      icon: MapPin,
      title: "Office",
      value: SITE_CONFIG.contact.address,
      sub: "Serving projects across regions",
    },
    {
      icon: Clock3,
      title: "Response SLA",
      value: SITE_CONFIG.contact.responseSLA,
      sub: "Engineering team review included",
    },
  ];

return (
    <div className='min-h-screen text-slate-900'>
      <HeroSection
        title='Contact Us'
        subtitle='Reach out for sewer systems, fire line installations, water utilities, or heavy infrastructure projects. We serve government and private clients across India.'
        buttonText='Get a Quote'
        buttonLink='/contact'
        showStats={false}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 sm:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card) => (
              <article key={card.title} className="rounded-xl border border-slate-200/50 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-amber-200">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                  <card.icon className="h-4 w-4 text-amber-600" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-600">{card.title}</p>
                <p className="mt-1 text-base font-bold text-slate-900">{card.value}</p>
                <p className="mt-0.5 text-xs text-slate-500">{card.sub}</p>
              </article>
            ))}
          </div>

          <div id="contact-form" className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <ContactForm onSubmit={handleFormSubmit} serviceOptions={serviceOptions} />

            <article className="rounded-2xl border border-slate-200/50 bg-white p-5 shadow-lg sm:p-6">
              <h3 className="text-lg font-bold text-slate-900">
                What To Share For Fastest Response
              </h3>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold text-white">1</span>
                  Project type and location details.
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold text-white">2</span>
                  Approximate execution timeline.
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold text-white">3</span>
                  Drawings/BOQ status and approvals.
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold text-white">4</span>
                  Any safety, compliance, or tender constraints.
                </li>
              </ul>

              <div className="mt-5 rounded-xl border border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  Need Immediate Discussion?
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  Call <span className="font-bold text-slate-900">{SITE_CONFIG.contact.phone}</span> for urgent site or tender coordination.
                </p>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
                <iframe
                  src="https://www.google.com/maps?q=Delhi,India&output=embed"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Company Location"
                ></iframe>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}