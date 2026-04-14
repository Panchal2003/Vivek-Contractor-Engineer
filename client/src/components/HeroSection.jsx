import { ArrowRight, Award, ShieldCheck, Users, CheckCircle } from 'lucide-react';

export default function HeroSection({
  title,
  subtitle,
  buttonText,
  buttonLink,
  secondaryText,
  secondaryLink,
  videoSrc = '',
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
    <section className='relative h-[70vh] lg:h-screen overflow-hidden'>
      {videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className='absolute inset-0 h-full w-full object-cover'
        >
          <source src={videoSrc} type='video/mp4' />
        </video>
      ) : (
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800' />
      )}

      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 right-0 w-full h-full bg-gradient-to-l from-slate-900/80 via-slate-900/40 to-transparent' />
        <div className='absolute -top-32 -right-32 w-64 h-64 lg:w-96 lg:h-96 bg-amber-500/15 rounded-full blur-[100px]'></div>
        <div className='absolute -bottom-32 -left-32 w-64 h-64 lg:w-96 lg:h-96 bg-orange-500/10 rounded-full blur-[100px]'></div>
      </div>

      <div className='relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='h-full flex flex-col justify-between py-6 lg:py-12'>
          <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 w-fit backdrop-blur-sm'>
            <Award className='w-3.5 h-3.5 text-amber-400' />
            <span className='text-xs font-semibold text-amber-100'>Since 2000</span>
            <span className='w-1 h-1 rounded-full bg-amber-500/50'></span>
            <span className='text-xs font-semibold text-blue-200'>ISO 9001</span>
          </div>

          <div className='flex-1 flex flex-col justify-center'>
            <h1 className='text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight'>
              Building
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400'>
                Infrastructure
              </span>
              <span className='block'>Tomorrow</span>
            </h1>

            <p className='mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-300 max-w-lg leading-relaxed'>
              {subtitle || 'Leading infrastructure contractor specializing in sewer systems, fire line installations, and water utility infrastructure across India.'}
            </p>

            <div className='mt-6 sm:mt-8 flex flex-wrap gap-4'>
              <a
                href={buttonLink || '/contact'}
                className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105'
              >
                {buttonText || 'Get a Quote'}
                <ArrowRight className='w-5 h-5' />
              </a>
              {secondaryText && (
                <a
                  href={secondaryLink || '/projects'}
                  className='inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:border-white/50'
                >
                  {secondaryText}
                </a>
              )}
            </div>

            <div className='hidden lg:flex flex-wrap items-center gap-6 mt-6 text-sm text-slate-400'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='w-5 h-5 text-emerald-400' />
                <span>ISO Certified</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle className='w-5 h-5 text-emerald-400' />
                <span>Government Approved</span>
              </div>
            </div>
          </div>

          {/* Mobile Stats Grid */}
          <div className='lg:hidden grid grid-cols-4 gap-3'>
            {[
              { value: '25+', label: 'Years' },
              { value: '120+', label: 'Projects' },
              { value: '400+', label: 'Workers' },
              { value: '98%', label: 'On-Time' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center'
              >
                <p className='text-lg font-bold text-white'>{stat.value}</p>
                <p className='text-[10px] text-slate-400'>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Desktop Stats Card (Right Side) */}
          <div className='hidden lg:block absolute top-1/2 right-4 lg:right-8 xl:right-12 -translate-y-1/2 w-72 lg:w-80 xl:w-96'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-2xl'></div>
              <div className='relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-8 space-y-4 lg:space-y-6'>
                <div className='grid grid-cols-2 gap-3 lg:gap-4'>
                  <div className='bg-white/5 rounded-2xl p-3 lg:p-4 text-center border border-white/5 hover:bg-white/10 transition-colors'>
                    <div className='w-8 h-8 lg:w-10 lg:h-10 mx-auto mb-2 lg:mb-3 rounded-xl bg-amber-500/20 flex items-center justify-center'>
                      <Award className='w-4 h-4 lg:w-5 lg:h-5 text-amber-400' />
                    </div>
                    <p className='text-xl lg:text-2xl font-bold text-white'>25+</p>
                    <p className='text-xs lg:text-sm text-slate-400'>Years</p>
                  </div>
                  <div className='bg-white/5 rounded-2xl p-3 lg:p-4 text-center border border-white/5 hover:bg-white/10 transition-colors'>
                    <div className='w-8 h-8 lg:w-10 lg:h-10 mx-auto mb-2 lg:mb-3 rounded-xl bg-emerald-500/20 flex items-center justify-center'>
                      <ShieldCheck className='w-4 h-4 lg:w-5 lg:h-5 text-emerald-400' />
                    </div>
                    <p className='text-xl lg:text-2xl font-bold text-white'>120+</p>
                    <p className='text-xs lg:text-sm text-slate-400'>Projects</p>
                  </div>
                  <div className='bg-white/5 rounded-2xl p-3 lg:p-4 text-center border border-white/5 hover:bg-white/10 transition-colors'>
                    <div className='w-8 h-8 lg:w-10 lg:h-10 mx-auto mb-2 lg:mb-3 rounded-xl bg-blue-500/20 flex items-center justify-center'>
                      <Users className='w-4 h-4 lg:w-5 lg:h-5 text-blue-400' />
                    </div>
                    <p className='text-xl lg:text-2xl font-bold text-white'>400+</p>
                    <p className='text-xs lg:text-sm text-slate-400'>Workers</p>
                  </div>
                  <div className='bg-white/5 rounded-2xl p-3 lg:p-4 text-center border border-white/5 hover:bg-white/10 transition-colors'>
                    <div className='w-8 h-8 lg:w-10 lg:h-10 mx-auto mb-2 lg:mb-3 rounded-xl bg-purple-500/20 flex items-center justify-center'>
                      <CheckCircle className='w-4 h-4 lg:w-5 lg:h-5 text-purple-400' />
                    </div>
                    <p className='text-xl lg:text-2xl font-bold text-white'>98%</p>
                    <p className='text-xs lg:text-sm text-slate-400'>On-Time</p>
                  </div>
                </div>

                <div className='pt-3 lg:pt-4 border-t border-white/10'>
                  <p className='text-xs lg:text-sm text-slate-400 mb-2 lg:mb-3'>Trusted by</p>
                  <div className='flex items-center justify-between opacity-60'>
                    <span className='text-[10px] lg:text-xs font-medium text-slate-300'>Govt. of India</span>
                    <span className='text-[10px] lg:text-xs font-medium text-slate-300'>MCGM</span>
                    <span className='text-[10px] lg:text-xs font-medium text-slate-300'>MMRDA</span>
                    <span className='text-[10px] lg:text-xs font-medium text-slate-300'>PWD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={scrollToContent}
            className='absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-amber-400 transition-colors cursor-pointer'
          >
            <span className='text-[10px] font-medium uppercase tracking-widest'>Scroll</span>
            <div className='w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5'>
              <div className='w-1.5 h-2.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full animate-bounce'></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}