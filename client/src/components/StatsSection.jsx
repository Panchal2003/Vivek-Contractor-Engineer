import { useEffect, useRef, useState } from "react";
import { BarChart3 } from "lucide-react";

export default function StatsSection({
  statsData = [],
  duration = 2000,
  incrementTime = 20,
  sectionClasses = "",
}) {
  const sectionRef = useRef(null);
  const [countStarted, setCountStarted] = useState(false);
  const [counters, setCounters] = useState(
    statsData.map((stat) => (typeof stat.value === "number" ? 0 : stat.value))
  );

  useEffect(() => {
    const currentSectionRef = sectionRef.current;

    const animateCounter = (end, index) => {
      let start = 0;
      const step = end / (duration / incrementTime);
      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounters((prev) => prev.map((v, i) => (i === index ? Math.floor(start) : v)));
      }, incrementTime);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countStarted) {
            setCountStarted(true);
            statsData.forEach((stat, index) => {
              if (typeof stat.value === "number") {
                animateCounter(stat.value, index);
              }
            });
          }
        });
      },
      { threshold: 0.45 }
    );

    if (currentSectionRef) observer.observe(currentSectionRef);
    return () => {
      if (currentSectionRef) observer.unobserve(currentSectionRef);
    };
  }, [countStarted, statsData, duration, incrementTime]);

  return (
    <section ref={sectionRef} className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 ${sectionClasses}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%,rgba(245,158,11,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Performance Snapshot</h2>
          <BarChart3 className="h-6 w-6 text-amber-400" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <article
              key={index}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center transition hover:bg-white/10 hover:border-amber-500/30"
            >
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500">
                {stat.icon && <i className={`${stat.icon} text-lg text-white`}></i>}
              </div>
              <p className="text-3xl font-bold text-white">
                {counters[index]}
                {stat.appendPlus ? "+" : ""}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-300">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}