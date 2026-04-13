import { Building2, FileCheck, Shield, Truck, Hammer, CheckCircle2 } from "lucide-react";

export default function Tenders() {
  const tenderServices = [
    { icon: Building2, title: "Sewer Line Maintenance", desc: "Comprehensive sewer network installation and maintenance" },
    { icon: Hammer, title: "Water Treatment Plants", desc: "Design, build and maintain water treatment facilities" },
    { icon: Shield, title: "Fire Line Installation", desc: "Fire safety pipeline systems with compliance" },
    { icon: Truck, title: "Heavy Drilling & Excavation", desc: "Large-scale earth moving and civil works" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
            <FileCheck className="h-4 w-4" />
            Opportunities
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Government & Private Tenders</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
            VCE Infra actively participates in Government and Private sector tenders across India for infrastructure projects.
          </p>
        </div>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/2 right-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {tenderServices.map((service, idx) => (
              <article 
                key={idx} 
                className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{service.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200/50 bg-white p-6 shadow-lg sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Why Choose Us for Tenders?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Competitive pricing with quality assurance",
                "Strong technical capabilities",
                "Experienced team for tender execution",
                "On-time delivery track record",
                "ISO certified quality standards",
                " PAN India project experience"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}