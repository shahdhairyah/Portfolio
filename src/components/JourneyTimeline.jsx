import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  Sparkles,
  Gamepad2,
  Code2,
  GraduationCap,
  Layout,
  Trophy,
  Briefcase,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const journeyData = [
  {
    year: "2021",
    hash: "c0ffee1",
    tag: "v1 · spark",
    title: "First Line of Code",
    desc: "A first C program lit the spark — turning logic into action.",
    icon: Gamepad2,
  },
  {
    year: "2022",
    hash: "web0002",
    tag: "v2 · web",
    title: "HTML & CSS",
    desc: "Discovered the web — structure, style, and instant results.",
    icon: Code2,
  },
  {
    year: "2023",
    hash: "dip10ma",
    tag: "v3 · foundation",
    title: "Diploma in Computer Engineering",
    desc: "Formal foundation in algorithms, databases, and systems at ADIT, CVM University.",
    icon: GraduationCap,
  },
  {
    year: "2024",
    hash: "r3act0r",
    tag: "v4 · frontend",
    title: "JavaScript & React",
    desc: "Modern frontend — components, state, and interactivity.",
    icon: Layout,
  },
  {
    year: "2023–24",
    hash: "h4ck4th",
    tag: "v5 · hackathon",
    title: "SSIP Hackathon — 4th Place My Sector",
    desc: "Top 4 in my sector, beating 2062 teams across Gujarat.",
    icon: Trophy,
  },
  {
    year: "2025",
    hash: "3xplain",
    tag: "v6 · award",
    title: "CVMU Hackathon 2025 — Top 181",
    desc: "36+ hours of live code — selected among the top 181 teams.",
    icon: Briefcase,
  },
  {
    year: "Now",
    hash: "m45t3r",
    tag: "v7 · current",
    title: "Full-Stack & AI",
    desc: "Building full-stack apps, exploring gesture recognition and ML.",
    icon: ShieldCheck,
  },
];

const TOTAL = journeyData.length;
const SEGMENTS = TOTAL + 2;

const WORDS = [
  "Commits",
  "Late-Nights",
  "Builds",
  "Milestones",
  "Debug Sprints",
  "Comebacks",
];

const RotatingWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm text-[#ff8a5c]">
      <span className="text-white/40">&gt;</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="inline-block"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
      <span className="ml-1 inline-block h-3.5 w-2 bg-[#bf4417] animate-blink" />
    </span>
  );
};

const pad = (n) => String(n).padStart(2, "0");

const JourneyTimeline = () => {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef });

  const [maxTravel, setMaxTravel] = useState(2200);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current && stickyRef.current) {
        setMaxTravel(
          Math.max(0, trackRef.current.scrollWidth - stickyRef.current.clientWidth)
        );
      }
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTravel]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ["6%", "-38%"]);
  const hudOpacity = useTransform(scrollYProgress, [0.05, 0.13], [0, 1]);
  const markerLeft = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const raw = Math.round(v * SEGMENTS) - 1;
    setActive(Math.min(TOTAL - 1, Math.max(0, raw)));
  });

  const goToChapter = (i) => {
    const el = sectionRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + (scrollable * (i + 1)) / SEGMENTS;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const ActiveIcon = journeyData[active].icon;

  return (
    <section ref={sectionRef} className="relative h-[340vh] bg-[#020202]">
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
        <div className="pointer-events-none absolute left-1/3 top-0 h-[420px] w-[700px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-15 blur-[150px]" />

        <motion.span
          aria-hidden
          style={{ x: ghostX }}
          className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 select-none whitespace-nowrap font-display text-[24vw] font-extrabold uppercase leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.05)]"
        >
          The Journey · The Journey · The Journey
        </motion.span>

        <motion.div
          style={{ opacity: hudOpacity }}
          className="absolute left-6 top-20 z-30 hidden font-mono text-xs text-white/40 md:left-[7vw] md:block"
        >
          ~/journey <span className="text-[#ff8a5c]">--reverse</span>
        </motion.div>

        <motion.div
          style={{ opacity: hudOpacity }}
          className="absolute right-6 top-20 z-30 hidden flex-col items-end gap-1 md:right-[7vw] md:flex"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
            Chapter
          </p>
          <div className="flex items-baseline gap-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="font-display text-5xl font-extrabold leading-none text-white"
              >
                {pad(active + 1)}
              </motion.span>
            </AnimatePresence>
            <span className="font-mono text-sm text-white/30">/ {pad(TOTAL)}</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-sm text-[#ff8a5c]">
            <ActiveIcon size={13} />
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {journeyData[active].year}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative z-10 flex items-stretch gap-5 py-10 pl-6 pr-[14vw] will-change-transform md:gap-8 md:pl-[7vw]"
        >
          <div className="flex w-[82vw] shrink-0 flex-col justify-center sm:w-[430px]">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#bf4417]/30 bg-[#bf4417]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#bf4417]">
              <Sparkles size={14} />
              <span>The Journey</span>
            </div>

            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight leading-[1.05] sm:text-5xl lg:text-6xl">
              How I{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b]">
                Got Here
              </span>
            </h2>

            <div className="mt-4">
              <RotatingWord />
            </div>

            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-white/50 sm:text-base">
              Rewind the tape — seven chapters of commits, late-night builds and
              milestones. This is the repo behind the portfolio.
            </p>

            <p className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-white/35">
              <span className="text-emerald-400">➜</span> keep scrolling — time
              moves sideways
            </p>
          </div>

          {journeyData.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === active;
            return (
              <motion.article
                key={item.hash}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={`group relative flex w-[78vw] shrink-0 flex-col justify-between rounded-2xl border p-6 transition-all duration-500 sm:w-[380px] md:p-7 ${
                  isActive
                    ? "border-[#bf4417]/50 bg-white/[0.06] shadow-[0_0_60px_rgba(191,68,23,0.15)]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute right-5 top-5 h-9 w-9 rounded-full border transition-all duration-500 ${
                    isActive
                      ? "border-[#bf4417]/40 bg-[#bf4417]/10"
                      : "border-white/10 bg-transparent"
                  }`}
                />
                <span
                  aria-hidden
                  className={`absolute right-8 top-8 h-3 w-3 rotate-45 transition-all duration-500 ${
                    isActive
                      ? "bg-[#bf4417] shadow-[0_0_16px_rgba(191,68,23,0.9)]"
                      : "bg-white/20"
                  }`}
                />

                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px]">
                    <span className="text-[#ff8a5c]">* {item.hash}</span>
                    <span className="text-white/40">({item.year})</span>
                  </div>

                  <span
                    className={`mt-5 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-500 ${
                      isActive
                        ? "border-[#bf4417]/50 bg-gradient-to-br from-[#bf4417]/25 to-transparent text-[#ffb08a]"
                        : "border-white/10 bg-white/[0.04] text-[#ff8a5c]"
                    }`}
                  >
                    <Icon size={20} />
                  </span>

                  <h3 className="mt-5 pr-10 font-display text-xl font-bold leading-snug text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[13px] font-light leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-white/50">
                    {item.tag}
                  </span>
                  <span className="font-mono text-[10px] text-white/25">
                    {pad(index + 1)} / {pad(TOTAL)}
                  </span>
                </div>
              </motion.article>
            );
          })}

          <div className="flex w-[70vw] shrink-0 flex-col justify-center gap-6 sm:w-[360px]">
            <span className="relative flex h-4 w-4 rotate-45 items-center justify-center">
              <span className="absolute inset-0 animate-ping bg-[#bf4417]/40" />
              <span className="relative h-4 w-4 bg-[#bf4417] shadow-[0_0_22px_rgba(191,68,23,0.9)]" />
            </span>

            <p className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Next chapter{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b]">
                compiling…
              </span>
            </p>

            <p className="font-mono text-xs text-white/45">
              <span className="text-[#ff8a5c]">HEAD</span> → Now · to be continued.
            </p>

            <Link
              to="/achievements"
              className="group inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/80 transition-all duration-200 hover:border-[#bf4417]/60 hover:text-white"
            >
              See achievements
              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: hudOpacity }}
          className="absolute bottom-7 left-1/2 z-30 w-[min(86%,780px)] -translate-x-1/2"
        >
          <div className="relative h-[3px] w-full overflow-visible rounded-full bg-white/10">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b] shadow-[0_0_12px_rgba(191,68,23,0.6)]"
            />
            <motion.div
              style={{ left: markerLeft }}
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#bf4417] shadow-[0_0_14px_rgba(191,68,23,0.9)]"
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {journeyData.map((item, index) => (
              <button
                key={item.hash}
                type="button"
                onClick={() => goToChapter(index)}
                aria-label={`Go to chapter ${index + 1}: ${item.title}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === active
                    ? "w-7 bg-[#bf4417] shadow-[0_0_10px_rgba(191,68,23,0.7)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
