import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence, useInView } from "framer-motion";
<<<<<<< HEAD
import {
  Layers, Monitor, Server, Wrench, Code2, Terminal, Database, Cpu,
  ChevronRight, Folder, FileCode, Braces, Hash,
} from "lucide-react";
=======
import { Layers, Monitor, Server, Wrench, Code2, Terminal, Database, Cpu } from "lucide-react";
>>>>>>> 049defcb8cb29f25572fd19a894af126eda57912
import { SEO } from "@/components/SEO";
import { skills, skillCategories, categoryColors } from "@/data/skills";

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const iconFor = (name) => {
  const key = name.toLowerCase();
  const map = {
    html5: "html5/html5-original.svg",
    css3: "css3/css3-original.svg",
    javascript: "javascript/javascript-original.svg",
    "react.js": "react/react-original.svg",
    react: "react/react-original.svg",
    bootstrap: "bootstrap/bootstrap-original.svg",
    "tailwind css": "tailwindcss/tailwindcss-original.svg",
    php: "php/php-original.svg",
    mysql: "mysql/mysql-original.svg",
    python: "python/python-original.svg",
    "node.js": "nodejs/nodejs-original.svg",
    git: "git/git-original.svg",
    github: "github/github-original.svg",
    "vs code": "vscode/vscode-original.svg",
    xampp: "apache/apache-original.svg",
  };
  const slug = map[key];
  return slug ? `${ICON_BASE}/${slug}` : null;
};

const catIcons = { all: Layers, frontend: Monitor, backend: Server, tools: Wrench };
<<<<<<< HEAD
const catFileIcons = { all: Braces, frontend: FileCode, backend: Database, tools: Wrench };
=======

>>>>>>> 049defcb8cb29f25572fd19a894af126eda57912
const levelLabels = { 1: "Beginner", 2: "Familiar", 3: "Proficient", 4: "Advanced", 5: "Expert" };

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://shahdhairyah.in/" },
    { "@type": "ListItem", position: 2, name: "Skills", item: "https://shahdhairyah.in/skills" },
  ],
};

const EASE = [0.16, 1, 0.3, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const catCounts = { all: skills.length };
skills.forEach((s) => { catCounts[s.category] = (catCounts[s.category] || 0) + 1; });
<<<<<<< HEAD
const avgLevel = (skills.reduce((a, s) => a + s.level, 0) / skills.length).toFixed(1);

/* ═══ HEADER ═══ */
const SkillsHeader = () => {
=======

const ProficiencyRing = ({ level, color, size = 44 }) => {
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = level / 5;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <svg ref={ref} width={size} height={size} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={inView ? { strokeDashoffset: circumference * (1 - pct) } : {}}
        transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-white/70 text-[11px] font-semibold font-mono"
      >
        {level}
      </text>
    </svg>
  );
};

ProficiencyRing.propTypes = {
  level: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number,
};

const skillNames = skills.map((s) => s.name);
const skillNamesReverse = [...skillNames].reverse();

const MarqueeRow = ({ items, reverse = false }) => (
  <div className="overflow-hidden whitespace-nowrap py-2.5">
    <div className={`flex w-max ${reverse ? "animate-marquee-right" : "animate-marquee-left"}`}>
      {[...items, ...items].map((name, i) => (
        <span key={i} className="mx-4 flex items-center gap-4 font-mono text-[13px] text-white/20 transition-colors hover:text-white/40">
          {name}
          <span className="h-1 w-1 rounded-full bg-[#bf4417]/40" />
        </span>
      ))}
    </div>
  </div>
);

MarqueeRow.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  reverse: PropTypes.bool,
};

const MouseGlow = () => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const enter = () => setActive(true);
    const leave = () => setActive(false);
    const move = (e) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("mousemove", move);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div
        className="absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(#bf4417_0%,transparent_70%)] blur-[80px] transition-opacity duration-500"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: active ? 0.08 : 0,
        }}
      />
    </div>
  );
};

const headerIcons = [
  { icon: Code2, pos: "top-[14%] left-[8%] md:left-[12%]", speed: "4.2s", size: 22 },
  { icon: Terminal, pos: "bottom-[24%] left-[10%] md:left-[16%]", speed: "5.1s", size: 20 },
  { icon: Database, pos: "top-[18%] right-[8%] md:right-[13%]", speed: "3.9s", size: 22 },
  { icon: Cpu, pos: "bottom-[22%] right-[10%] md:right-[15%]", speed: "4.7s", size: 20 },
  { icon: Layers, pos: "top-[48%] left-[5%]", speed: "5.4s", size: 17 },
];

const SkillsHeader = () => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const end = skills.length;
    const duration = 1400;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView]);

>>>>>>> 049defcb8cb29f25572fd19a894af126eda57912
  return (
    <section className="relative w-full flex min-h-[320px] flex-col items-center justify-center overflow-hidden bg-[#020202] px-6 py-20 md:min-h-[420px]">
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(#bf4417_0%,transparent_55%)] opacity-20 blur-[100px] md:w-[1100px]" />

<<<<<<< HEAD
      {[
        { icon: Code2, pos: "top-[14%] left-[8%] md:left-[12%]", spd: "4.2s", sz: 22 },
        { icon: Terminal, pos: "bottom-[24%] left-[10%] md:left-[16%]", spd: "5.1s", sz: 20 },
        { icon: Database, pos: "top-[18%] right-[8%] md:right-[13%]", spd: "3.9s", sz: 22 },
        { icon: Cpu, pos: "bottom-[22%] right-[10%] md:right-[15%]", spd: "4.7s", sz: 20 },
        { icon: Layers, pos: "top-[48%] left-[5%]", spd: "5.4s", sz: 17 },
      ].map((item, i) => {
        const IC = item.icon;
=======
      {headerIcons.map((item, i) => {
        const IconComponent = item.icon;
>>>>>>> 049defcb8cb29f25572fd19a894af126eda57912
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
            className={`absolute ${item.pos} z-20 rounded-xl border border-[#bf4417]/25 bg-white/[0.04] p-3 text-[#bf4417]/70 backdrop-blur-md animate-bounce`}
<<<<<<< HEAD
            style={{ animationDuration: item.spd }}
          >
            <IC size={item.sz} />
=======
            style={{ animationDuration: item.speed }}
          >
            <IconComponent size={item.size} />
>>>>>>> 049defcb8cb29f25572fd19a894af126eda57912
          </motion.div>
        );
      })}

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative z-10 font-mono text-xs tracking-[0.08em] text-white/40 sm:text-sm"
      >
        <span className="text-emerald-400">➜</span>{" "}
        <span className="text-sky-400">~</span> cat stack.json{" "}
        <span className="text-white/30">| jq</span>
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="relative z-10 mt-5 select-none text-center font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(3rem,10vw,8rem)]"
      >
        <span className="block text-white">The</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b]">
          Craft
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
        className="relative z-10 mt-6 max-w-lg text-center text-sm font-light leading-relaxed text-white/55 sm:text-base"
      >
        Every project starts with the right tools. Here&apos;s the set I reach
        for — honed across builds, deadlines and late-night debug sessions.
      </motion.p>

      <motion.div
<<<<<<< HEAD
=======
        ref={ref}
>>>>>>> 049defcb8cb29f25572fd19a894af126eda57912
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
        className="relative z-10 mt-10 flex items-center gap-0 divide-x divide-white/10 overflow-hidden rounded-full border border-white/10 bg-white/[0.02]"
      >
        <div className="px-6 py-3 text-center">
<<<<<<< HEAD
          <span className="font-display text-2xl font-extrabold text-white">{skills.length}</span>
=======
          <span className="font-display text-2xl font-extrabold text-white">{display}</span>
>>>>>>> 049defcb8cb29f25572fd19a894af126eda57912
          <span className="ml-1 font-mono text-xs text-white/30">+</span>
          <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/35">Technologies</p>
        </div>
        <div className="px-6 py-3 text-center">
          <span className="font-display text-2xl font-extrabold text-white">3</span>
          <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/35">Categories</p>
        </div>
        <div className="px-6 py-3 text-center">
<<<<<<< HEAD
          <span className="font-display text-2xl font-extrabold text-white">{avgLevel}</span>
=======
          <span className="font-display text-2xl font-extrabold text-white">4.1</span>
>>>>>>> 049defcb8cb29f25572fd19a894af126eda57912
          <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/35">Avg Level</p>
        </div>
      </motion.div>
    </section>
  );
};

<<<<<<< HEAD
/* ═══ SIDEBAR ITEM ═══ */
const SidebarItem = ({ cat, active, onClick }) => {
  const Icon = catIcons[cat.id];
  const color = cat.id === "all" ? "#bf4417" : categoryColors[cat.id];

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition-all duration-200 ${
        active
          ? "bg-[#bf4417]/10 text-white border border-[#bf4417]/20"
          : "text-white/40 hover:text-white/70 hover:bg-white/[0.03] border border-transparent"
      }`}
    >
      <Icon size={15} style={{ color: active ? color : undefined }} className={active ? "" : "text-white/30"} />
      <span className="flex-1 capitalize">{cat.label}</span>
      <span className={`font-mono text-[10px] ${active ? "text-[#bf4417]/70" : "text-white/15"}`}>
        {catCounts[cat.id] || 0}
      </span>
    </button>
  );
};

SidebarItem.propTypes = {
  cat: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

/* ═══ SKILL GRID CARD ═══ */
const SkillGridCard = ({ skill, index }) => {
  const icon = iconFor(skill.name);
  const color = categoryColors[skill.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: EASE }}
      className="group relative flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center transition-all duration-300 hover:border-[#bf4417]/25 hover:bg-white/[0.045]"
    >
      {/* Top accent on hover */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] opacity-0 transition-opacity duration-400 group-hover:opacity-100 rounded-t-xl"
        style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
      />

      {/* Icon */}
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300 group-hover:scale-110"
        style={{ boxShadow: `0 0 0 1px ${color}08` }}
      >
        {icon ? (
          <img
            src={icon}
            alt={skill.name}
            loading="lazy"
            className={`h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105 ${skill.name === "GitHub" ? "invert opacity-70" : ""}`}
          />
        ) : (
          <span className="text-xl font-bold" style={{ color }}>{skill.name.charAt(0)}</span>
        )}
      </div>

      {/* Name */}
      <h4 className="font-display text-sm font-bold text-white/85 group-hover:text-white transition-colors">
        {skill.name}
      </h4>

      {/* Description */}
      <p className="text-[11px] text-white/30 leading-relaxed line-clamp-2">
        {skill.description}
      </p>

      {/* Level bar */}
      <div className="w-full mt-auto">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider">{levelLabels[skill.level]}</span>
          <span className="font-mono text-[10px] text-white/25">{skill.level}/5</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: skill.level / 5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: EASE }}
            className="h-full origin-left rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </motion.div>
  );
};

SkillGridCard.propTypes = {
  skill: PropTypes.object.isRequired,
  index: PropTypes.number,
};

/* ═══ MAIN ═══ */
=======
>>>>>>> 049defcb8cb29f25572fd19a894af126eda57912
export const Skills = () => {
  const [activeCat, setActiveCat] = useState("all");

  const filtered =
    activeCat === "all"
      ? skills
      : skills.filter((s) => s.category === activeCat);

  return (
    <main className="relative w-full bg-[#020202]">
      <SEO
        title="Shah Dhairya's Skills – React, Node.js, Python, MySQL"
        description="Technical skills of Shah Dhairya: React, PHP, Python, MySQL, Tailwind CSS, Git, and more."
        path="/skills"
        jsonLd={breadcrumbJsonLd}
      />

      <SkillsHeader />

<<<<<<< HEAD
      {/* ═══ EXPLORER SECTION ═══ */}
      <section className="relative w-full px-5 py-14 md:py-20 overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[500px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Section label */}
          <motion.div {...reveal()} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#bf4417]/20 bg-[#bf4417]/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#bf4417]/70">
              <Folder size={12} />
              Explorer
            </span>
          </motion.div>

          <motion.h2
            {...reveal(0.05)}
            className="text-center font-display text-2xl font-bold text-white/90 md:text-3xl"
          >
            Browse the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] to-amber-500">Toolkit</span>
          </motion.h2>
          <motion.p
            {...reveal(0.1)}
            className="mt-3 text-center text-sm text-white/40 max-w-md mx-auto"
          >
            Navigate by category on the left, explore skills on the right.
          </motion.p>

          {/* Split layout */}
          <motion.div
            {...reveal(0.15)}
            className="mt-10 flex flex-col md:flex-row gap-6"
          >
            {/* ── Sidebar ── */}
            <div className="md:w-52 shrink-0">
              <div className="sticky top-24 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                {/* Sidebar header */}
                <div className="flex items-center gap-2 px-2 py-1.5 mb-2 border-b border-white/[0.05]">
                  <Hash size={12} className="text-[#bf4417]/50" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">Categories</span>
                </div>

                <div className="space-y-1">
                  {skillCategories.map((cat) => (
                    <SidebarItem
                      key={cat.id}
                      cat={cat}
                      active={activeCat === cat.id}
                      onClick={() => setActiveCat(cat.id)}
                    />
                  ))}
                </div>

                {/* Sidebar footer */}
                <div className="mt-4 pt-3 border-t border-white/[0.05] px-2">
                  <div className="flex items-center justify-between text-[9px] font-mono text-white/15 uppercase tracking-wider">
                    <span>Total</span>
                    <span className="text-[#bf4417]/50">{filtered.length} items</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Main Grid ── */}
            <div className="flex-1 min-w-0">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-5 font-mono text-[11px] text-white/25">
                <span className="text-[#bf4417]/50">skills</span>
                <ChevronRight size={10} />
                <span className="text-white/40 capitalize">{activeCat === "all" ? "all" : activeCat}</span>
                <span className="text-white/15">({filtered.length})</span>
              </div>

              {/* Grid */}
              <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <AnimatePresence mode="popLayout">
                  {filtered.map((skill, i) => (
                    <SkillGridCard key={skill.name} skill={skill} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty */}
              <AnimatePresence>
                {filtered.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <Folder size={32} className="text-white/10" />
                    <p className="mt-3 text-sm text-white/25 font-mono">No skills in this folder</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
=======
      <div className="relative w-full border-y border-white/[0.06] bg-white/[0.015]">
        <MarqueeRow items={skillNames} />
        <MarqueeRow items={skillNamesReverse} reverse />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202]" />
      </div>

      <section className="relative w-full px-6 py-16 md:py-24 overflow-hidden">
        <MouseGlow />
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[500px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div {...reveal()} className="flex flex-wrap items-center justify-center gap-3">
            {skillCategories.map((cat) => {
              const active = activeCat === cat.id;
              const Icon = catIcons[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 ${
                    active
                      ? "bg-[#bf4417] text-white shadow-[0_0_24px_rgba(191,68,23,0.45)]"
                      : "border border-white/10 bg-white/[0.03] text-white/50 hover:border-[#bf4417]/50 hover:text-white"
                  }`}
                >
                  <Icon size={14} />
                  {cat.label}
                  <span className={`ml-0.5 font-mono text-[10px] ${active ? "text-white/70" : "text-white/30"}`}>
                    {catCounts[cat.id] || 0}
                  </span>
                </button>
              );
            })}
          </motion.div>

          <motion.div {...reveal(0.05)} className="mt-6 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.16em] text-white/25">
            <span className="flex items-center gap-2">
              <span className="inline-block h-px w-4 bg-[#f97316]" /> Frontend
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-px w-4 bg-[#06b6d4]" /> Backend
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-px w-4 bg-[#a855f7]" /> Tools
            </span>
          </motion.div>

          <motion.div layout className="mt-10 grid gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((skill, i) => {
                const icon = iconFor(skill.name);
                const color = categoryColors[skill.category];

                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                    className="group relative flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-[#bf4417]/40 hover:bg-white/[0.06] hover:shadow-[0_0_50px_rgba(191,68,23,0.08)]"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(191,68,23,0.6)]"
                      style={{ backgroundColor: color }}
                    />

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-[#bf4417]/30 group-hover:bg-white/[0.08]">
                      {icon ? (
                        <img
                          src={icon}
                          alt={skill.name}
                          loading="lazy"
                          decoding="async"
                          className={`h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110 ${
                            skill.name === "GitHub" ? "invert opacity-80" : ""
                          }`}
                        />
                      ) : (
                        <span
                          className="text-xl font-bold"
                          style={{ color }}
                        >
                          {skill.name.charAt(0)}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-base font-bold text-white/90 group-hover:text-white transition-colors truncate">
                          {skill.name}
                        </h3>
                        <span
                          className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-mono"
                          style={{
                            borderColor: `${color}35`,
                            color,
                          }}
                        >
                          {levelLabels[skill.level]}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-white/45 leading-relaxed">
                        {skill.description}
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: skill.level / 5 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.06, ease: EASE }}
                            className="absolute inset-y-0 left-0 origin-left rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        </div>
                        <ProficiencyRing level={skill.level} color={color} size={38} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
>>>>>>> 049defcb8cb29f25572fd19a894af126eda57912
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Skills;
