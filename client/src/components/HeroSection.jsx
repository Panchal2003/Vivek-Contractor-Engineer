import { ArrowRight, Award, ShieldCheck, Users } from "lucide-react";

export default function HeroSection({
  title,
  subtitle,
  buttonText,
  buttonLink,
  videoSrc = "",
  showStats = true,
}) {
  const scrollToContent = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-[100vh] flex items-center justify-center overflow-hidden pt-16 sm:pt-0">
      {videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 sm:-top-60 -right-40 sm:-right-60 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-amber-500/20 rounded-full blur-[80px] sm:blur-[100px] animate-float"></div>
        <div classclassName="absolute -bottom-40 sm:-bottom-60 -left-40 sm:-left-60 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-orange-500/15 rounded-full blur-[80px] sm:blur-[100px] animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h40v40H0V0zm1%201h38v1H1V1zm0%206h38v1H1V7zm0%206h38v1H1v-1zm0%206h38v1H1v-1zm0%206h38v1H1v-1zm0%206h38v1H1v-1zm0%206h38v1H1v-1z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.04%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] opacity-60"></div>

        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-slate-900/20" />

      <div className="relative z-10 w-full max-w-7xl px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 sm:mb-6 inline-flex animate-fadeInUp stagger-1">
            <div className="flex items-center gap-2 sm:gap-3 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2">
              <Award className="h-3.5 sm:h-5 w-3.5 sm:w-5 text-amber-400" />
              <span className="text-xs sm:text-sm font-bold text-amber-100 uppercase tracking-wider">Established 2000</span>
              <span className="hidden sm:block mx-2 h-1 w-1 rounded-full bg-amber-500/50"></span>
              <span className="hidden sm:block text-xs sm:text-sm font-bold text-blue-200 uppercase tracking-wider">ISO 9001:2015</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight text-white animate-fadeInUp stagger-2">
            <span className="block">Engineering</span>
            <span className="block mt-1">
              Excellence{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 animate-gradient">Since 2000</span>
                <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-3 sm:h-4 text-amber-500/30" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path d="M2,14 Q50,18 100,14 T198,14" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-xs sm:text-sm lg:text-base leading-relaxed text-slate-300 animate-fadeInUp stagger-3">
            {subtitle || "Leading infrastructure contractor specializing in sewer systems, fire line installations, and water utility infrastructure across India."}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-2 sm:gap-4 animate-fadeInUp stagger-4">
            <a
              href={buttonLink || "/contact"}
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/40 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                {buttonText || "Get a Quote"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-5 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-105"
            >
              View Our Work
            </a>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 animate-fadeInUp stagger-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full bg-amber-500/20 border border-amber-500/30">
                <Award className="h-4 sm:h-5 w-4 sm:w-5 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-sm sm:text-lg font-bold text-white">25+</p>
                <p className="text-[10px] sm:text-xs text-slate-400">Years</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <ShieldCheck className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-sm sm:text-lg font-bold text-white">120+</p>
                <p className="text-[10px] sm:text-xs text-slate-400">Projects</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/30">
                <Users className="h-4 sm:h-5 w-4 sm:w-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-sm sm:text-lg font-bold text-white">400+</p>
                <p className="text-[10px] sm:text-xs text-slate-400">Workforce</p>
              </div>
            </div>
          </div>
        </div>

        {showStats && (
          <div className="mt-8 sm:mt-10 grid grid-cols-4 gap-2 sm:gap-3 animate-fadeInUp stagger-5">
            {[
              { value: "120+", label: "Projects" },
              { value: "25+", label: "Years" },
              { value: "98%", label: "On-Time" },
              { value: "10+", label: "Govt" },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className="rounded-lg sm:rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-2 sm:p-3 text-center hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <p className="text-xs sm:text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={scrollToContent}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer text-white/50 transition-all duration-300 hover:text-amber-400"
      >
        <span className="text-[10px] font-medium uppercase tracking-widest">Explore</span>
        <div className="h-6 sm:h-8 w-4 sm:w-5 rounded-full border border-white/30 bg-white/5">
          <div className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-400 to-orange-500 animate-bounce" />
        </div>
      </button>
    </section>
  );
}