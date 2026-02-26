import { useEffect, useRef, useState } from "react";
import { BarChart3 } from "lucide-react";

export default function StatsSection({
  statsData = [],
  duration = 2000,
  incrementTime = 20,
  sectionClasses = "",
  floatElements = [],
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
    <section ref={sectionRef} className={`relative overflow-hidden bg-slate-950/70 py-20 sm:py-24 ${sectionClasses}`}>
      {floatElements.map((el, i) => (
        <div
          key={i}
          className={`absolute ${el.position} ${el.size} ${el.bgColor} rounded-full blur-3xl ${el.animation}`}
        ></div>
      ))}

      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1c_1px,transparent_1px)] bg-[size:48px_48px]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Performance Snapshot</h2>
          <BarChart3 className="h-6 w-6 text-cyan-200" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <article
              key={index}
              className="rounded-2xl border border-white/15 bg-slate-900/75 p-6 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:border-cyan-300/40"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/10">
                {stat.icon && <i className={`${stat.icon} text-xl ${stat.iconColor || "text-cyan-200"}`}></i>}
              </div>
              <p className="text-3xl font-extrabold text-white">
                {counters[index]}
                {stat.appendPlus ? "+" : ""}
              </p>
              <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
