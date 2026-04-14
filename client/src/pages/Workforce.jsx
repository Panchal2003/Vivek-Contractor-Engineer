import HeroSection from "../components/HeroSection";
import CTASection from "../components/CTASection";
import { Users, Briefcase, ShieldCheck, Award, Clock, Building2 } from "lucide-react";

export default function Workforce() {
  const workforceData = [
    {
      icon: Users,
      title: "400–500 Workers",
      desc: "Skilled & experienced field staff across all departments",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Briefcase,
      title: "Site Engineers",
      desc: "Professional supervision team with industry expertise",
      color: "from-violet-500 to-violet-600",
    },
    {
      icon: ShieldCheck,
      title: "Safety Standards",
      desc: "Zero indiscipline record with ISO compliance",
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  const teamStats = [
    { value: "400+", label: "Skilled Workers" },
    { value: "25+", label: "Years Experience" },
    { value: "98%", label: "Project Success" },
    { value: "10+", label: "Government Projects" },
  ];

  const certifications = [
    "ISO 9001:2015 Certified",
    "ISO 14001:2015 Environmental",
    "OHSAS 18001:2007 Safety",
    "Government Contractor License",
  ];

return (
    <div className='text-slate-900'>
      <HeroSection
        title='Our Workforce'
        subtitle='Team of 400+ skilled workers, experienced engineers, and safety professionals delivering quality infrastructure projects with ISO compliance.'
        buttonText='Contact Us'
        buttonLink='/contact'
        showStats={false}
      />

      <section className="relative bg-white py-12 sm:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            {teamStats.map((stat, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200/50 bg-white p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-amber-600">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {workforceData.map((item, idx) => (
              <article key={idx} className="group relative rounded-2xl border border-slate-200/50 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200/50 bg-white p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 text-center mb-6">Certifications & Accreditations</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <Award className="h-6 w-6 text-amber-500" />
                  <span className="text-sm font-medium text-slate-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need Additional Workforce?"
        subtitle="Contact us to discuss your manpower requirements."
        buttonText="Contact Us"
        to="/contact"
      />
    </div>
  );
}