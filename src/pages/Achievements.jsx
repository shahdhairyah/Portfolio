import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Trophy, Award, Flame, Users, Quote, ArrowUpRight, Medal } from "lucide-react";
import { motion, animate, useInView } from "framer-motion";
import { SEO } from "@/components/SEO";
import { hackathons } from "@/data/achievements";

const achievements = [
  { icon: Flame, number: "25+", label: "Hackathon Participant" },
  { icon: Users, number: "3+", label: "Years Building" },
  { icon: Trophy, number: "2", label: "Hackathon Winner (State Level)" },
  { icon: Award, number: "17+", label: "Hackathon Final Round Selected" },
];

const CountUp = ({ value }) => {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const suffix = value.replace(/[0-9.]/g, "");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, numeric, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, numeric]);

  return (
    <span ref={ref}>
      {Math.round(display)}
      {suffix}
    </span>
  );
};

CountUp.propTypes = { value: PropTypes.string.isRequired };

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://shahdhairyah.in/" },
    { "@type": "ListItem", position: 2, name: "Achievements", item: "https://shahdhairyah.in/achievements" },
  ],
};

const EASE = [0.16, 1, 0.3, 1];

const AchievementsHeader = () => {
  return (
    <section className="relative w-full flex min-h-[320px] flex-col items-center justify-center overflow-hidden bg-[#020202] px-6 py-20 md:min-h-[420px]">
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(#bf4417_0%,transparent_55%)] opacity-20 blur-[100px] md:w-[1100px]" />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative z-10 font-mono text-xs tracking-[0.08em] text-white/50 sm:text-sm"
      >
        <span className="text-emerald-400">➜</span>{" "}
        <span className="text-sky-400">~</span> grep -r{" "}
        <span className="text-white/30">&quot;wins&quot; ./achievements</span>
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="relative z-10 mt-5 select-none text-center font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(3rem,10vw,8rem)]"
      >
        <span className="block text-white">Hall of</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b]">
          Fame
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
        className="relative z-10 mt-6 max-w-lg text-center text-sm font-light leading-relaxed text-white/55 sm:text-base"
      >
        Milestones, hackathon records, and recognition earned along the way.
        Every number tells a story of building under pressure.
      </motion.p>
    </section>
  );
};

export const Achievements = () => {
  return (
    <main className="relative w-full bg-[#020202]">
      <SEO
        title="Achievements – Shah Dhairya, Hackathons & Awards"
        description="Hackathon achievements and milestones of Shah Dhairya — SSIP Hackathon 4th place in my sector, selected in the top 181 teams of CVMU Hackathon 2025, Gujarat Gaurav Award 2026, and more."
        path="/achievements"
        jsonLd={breadcrumbJsonLd}
      />

      <AchievementsHeader />

      <div className="relative w-full overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[600px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[140px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-16 md:space-y-24">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                  className="group relative overflow-hidden p-6 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-[#bf4417]/50 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(191,68,23,0.15)] transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#bf4417] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[radial-gradient(#bf4417,transparent)] blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity" />
                  <Icon size={20} className="text-[#bf4417] mb-4" />
                  <div className="font-display text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a4d] to-[#991b1b]">
                    <CountUp value={a.number} />
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {a.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Hackathon Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathons.map((hack, i) => {
              const Icon = hack.icon === Medal ? Medal : hack.icon === Award ? Award : Trophy;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                  className="group relative overflow-hidden p-8 bg-white/[0.03] rounded-3xl border border-white/10 hover:border-[#bf4417]/50 hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#bf4417] via-amber-500 to-[#991b1b]" />
                  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[radial-gradient(#bf4417,transparent)] blur-[70px] opacity-[0.08] group-hover:opacity-[0.18] transition-opacity" />

                  <span
                    aria-hidden
                    className="pointer-events-none select-none absolute bottom-1 right-5 font-display font-extrabold leading-none text-[5.5rem] md:text-[7rem] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)]"
                  >
                    {hack.rank}
                  </span>

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#bf4417]/20 to-[#991b1b]/10 border border-[#bf4417]/30 text-[#ff9a4d] shadow-[0_0_20px_rgba(191,68,23,0.25)] group-hover:scale-105 transition-transform">
                        <Icon size={24} />
                      </div>
                      <div>
                        <span className="inline-block px-2.5 py-1 rounded-md bg-[#bf4417]/10 border border-[#bf4417]/30 text-[11px] font-bold text-[#ff9a4d]">
                          {hack.org}
                        </span>
                        <span className="block mt-1.5 text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">
                          {hack.year}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold font-mono shrink-0">
                      <Trophy size={13} />
                      {hack.rank}
                    </span>
                  </div>

                  <h3 className="relative mt-7 font-display text-2xl md:text-3xl text-white leading-snug">
                    {hack.title}
                  </h3>

                  <p className="relative mt-4 text-white/60 leading-relaxed">{hack.text}</p>

                  <div className="relative mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {hack.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="px-3 py-4 rounded-xl bg-white/[0.02] border border-white/5 border-l-2 border-l-[#bf4417] sm:flex sm:flex-col sm:items-center sm:text-center"
                      >
                        <div className="font-display text-xl sm:text-2xl text-white">
                          {stat.value}
                        </div>
                        <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/50">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-7">
                    <Link
                      to={`/achievements/${hack.slug}`}
                      className="group/more inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#bf4417]/40 text-[#ff9a4d] text-xs font-semibold uppercase tracking-widest hover:bg-[#bf4417]/10 transition-all duration-300"
                    >
                      More Details
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover/more:translate-x-0.5 group-hover/more:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-[#bf4417]/50 to-transparent" />
            <Quote size={28} className="mx-auto text-[#bf4417] mb-6" />
            <p className="font-display text-xl md:text-2xl text-white/85 leading-relaxed max-w-3xl mx-auto">
              &quot;The clarity of presentation and depth of technical understanding
              set Dhairya&apos;s team apart.&quot;
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#bf4417]/40" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#bf4417]">
                — CVMU 2025 Judge
              </span>
              <span className="h-px w-8 bg-[#bf4417]/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Achievements;
