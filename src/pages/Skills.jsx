import { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Layers,
  Monitor,
  Server,
  Wrench,
  Code2,
  Terminal,
  Database,
  Cpu,
  Sparkles,
  Zap,
  Eye,
  ChevronDown,
} from "lucide-react";
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
const avgLevel = (skills.reduce((a, s) => a + s.level, 0) / skills.length).toFixed(1);

/* ═══════════════════════════════════
   CONSTELLATION NODE POSITIONS
   Arranged in two rings around center
   ═══════════════════════════════════ */
const ringPositions = skills.map((skill, i) => {
  const total = skills.length;
  const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
  const ring = skill.level >= 4 ? 1 : 0;
  const radius = ring === 1 ? 0.32 : 0.2;
  const jitter = (Math.sin(i * 3.7) * 0.02);
  return {
    x: 0.5 + Math.cos(angle) * (radius + jitter),
    y: 0.5 + Math.sin(angle) * (radius + jitter),
    ring,
  };
});

/* ═══════════════════════════════════
   STAR FIELD
   ═══════════════════════════════════ */
const stars = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.4 + 0.1,
  pulse: Math.random() * 4 + 3,
}));

/* ═══════════════════════════════════
   HEADER
   ═══════════════════════════════════ */
const SkillsHeader = () => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const end = skills.length;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView]);

  return (
    <section className="relative w-full flex min-h-[360px] flex-col items-center justify-center overflow-hidden bg-[#020202] px-6 py-20 md:min-h-[460px]">
      {/* Grid */}
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:60px_60px] pointer-events-none" />

      {/* Central glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(#bf4417_0%,transparent_50%)] opacity-20 blur-[80px] md:h-[450px] md:w-[450px]" />

      {/* Animated orbit rings */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#bf4417]/10 md:h-[340px] md:w-[340px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#bf4417]/5 border-dashed md:h-[520px] md:w-[520px]"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{ width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%` }}
            animate={{ opacity: [s.opacity, s.opacity * 2.5, s.opacity] }}
            transition={{ duration: s.pulse, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Floating icons */}
      {[
        { icon: Code2, pos: "top-[14%] left-[8%] md:left-[12%]", spd: "4.2s", sz: 20 },
        { icon: Terminal, pos: "bottom-[22%] left-[10%] md:left-[15%]", spd: "5.1s", sz: 18 },
        { icon: Database, pos: "top-[16%] right-[8%] md:right-[12%]", spd: "3.9s", sz: 20 },
        { icon: Cpu, pos: "bottom-[20%] right-[10%] md:right-[14%]", spd: "4.7s", sz: 18 },
        { icon: Sparkles, pos: "top-[48%] left-[4%]", spd: "5.4s", sz: 16 },
        { icon: Zap, pos: "top-[38%] right-[4%] md:right-[7%]", spd: "3.6s", sz: 16 },
      ].map((item, i) => {
        const IC = item.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            className={`absolute ${item.pos} z-20 rounded-xl border border-[#bf4417]/20 bg-white/[0.03] p-2.5 text-[#bf4417]/60 backdrop-blur-md animate-bounce`}
            style={{ animationDuration: item.spd }}
          >
            <IC size={item.sz} />
          </motion.div>
        );
      })}

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative z-10 font-mono text-xs tracking-[0.08em] text-white/35 sm:text-sm"
      >
        <span className="text-emerald-400">➜</span>{" "}
        <span className="text-sky-400">~</span> cat stack.json{" "}
        <span className="text-white/25">| jq</span>
      </motion.p>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="relative z-10 mt-5 select-none text-center font-display font-extrabold uppercase leading-[0.9] tracking-tight text-[clamp(3rem,11vw,8.5rem)]"
      >
        <span className="block text-white">Skill</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-500 to-[#991b1b]">
          Universe
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
        className="relative z-10 mt-6 max-w-md text-center text-sm font-light leading-relaxed text-white/50 sm:text-base"
      >
        Each node is a technology I&apos;ve worked with — hover to explore the
        connections that power my builds.
      </motion.p>

      {/* Stats */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
        className="relative z-10 mt-10 grid grid-cols-3 divide-x divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]"
      >
        <div className="px-6 py-4 text-center">
          <span className="font-display text-2xl font-extrabold text-white">{display}<span className="ml-0.5 text-base text-[#bf4417]">+</span></span>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/30">Technologies</p>
        </div>
        <div className="px-6 py-4 text-center">
          <span className="font-display text-2xl font-extrabold text-white">3</span>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/30">Domains</p>
        </div>
        <div className="px-6 py-4 text-center">
          <span className="font-display text-2xl font-extrabold text-[#bf4417]">{avgLevel}</span>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/30">Avg Level</p>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-white/20"
        >
          <Eye size={14} />
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════
   CONSTELLATION MAP
   SVG-based skill constellation
   ═══════════════════════════════════ */
const ConstellationMap = ({ items, onHover }) => {
  const containerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const nodePositions = useMemo(() => {
    const total = items.length;
    return items.map((skill, i) => {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const isHigh = skill.level >= 4;
      const radius = isHigh ? 0.34 : 0.19;
      const jitter = Math.sin(i * 4.1) * 0.015;
      return {
        x: 50 + Math.cos(angle) * ((radius + jitter) * 100),
        y: 50 + Math.sin(angle) * ((radius + jitter) * 100),
      };
    });
  }, [items]);

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-[600px] mx-auto">
      {/* SVG lines + nodes */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {/* Connection lines to center */}
        {nodePositions.map((pos, i) => {
          const isHov = hoveredIdx === i;
          const color = categoryColors[items[i].category];
          return (
            <motion.line
              key={`line-${i}`}
              x1="50" y1="50"
              x2={pos.x} y2={pos.y}
              stroke={isHov ? color : "rgba(255,255,255,0.04)"}
              strokeWidth={isHov ? 0.4 : 0.15}
              strokeDasharray={isHov ? "none" : "1 1"}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.06, ease: EASE }}
            />
          );
        })}

        {/* Cross-links between nearby high-level skills */}
        {nodePositions.map((pos, i) => {
          if (items[i].level < 4) return null;
          const connections = [];
          nodePositions.forEach((pos2, j) => {
            if (j <= i || items[j].level < 4) return;
            const dist = Math.hypot(pos.x - pos2.x, pos.y - pos2.y);
            if (dist < 30) connections.push({ pos: pos2, j });
          });
          return connections.map(({ pos: pos2, j }) => (
            <line
              key={`cross-${i}-${j}`}
              x1={pos.x} y1={pos.y}
              x2={pos2.x} y2={pos2.y}
              stroke="rgba(191,68,23,0.06)"
              strokeWidth="0.1"
            />
          ));
        })}

        {/* Center hub */}
        <circle cx="50" cy="50" r="3" fill="none" stroke="#bf4417" strokeWidth="0.3" opacity="0.4" />
        <circle cx="50" cy="50" r="1.5" fill="#bf4417" opacity="0.6" />
        <motion.circle
          cx="50" cy="50" r="5"
          fill="none" stroke="#bf4417" strokeWidth="0.15"
          opacity="0.2"
          animate={{ r: [5, 6.5, 5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Skill nodes */}
        {nodePositions.map((pos, i) => {
          const skill = items[i];
          const color = categoryColors[skill.category];
          const isHov = hoveredIdx === i;
          const nodeR = skill.level >= 4 ? 2.8 : 2;
          return (
            <g
              key={`node-${skill.name}`}
              onMouseEnter={() => { setHoveredIdx(i); onHover?.(skill); }}
              onMouseLeave={() => { setHoveredIdx(null); onHover?.(null); }}
              className="cursor-pointer"
            >
              {/* Glow ring on hover */}
              {isHov && (
                <motion.circle
                  cx={pos.x} cy={pos.y} r={nodeR + 2}
                  fill="none" stroke={color} strokeWidth="0.2" opacity="0.5"
                  initial={{ r: nodeR, opacity: 0 }}
                  animate={{ r: nodeR + 3, opacity: [0.5, 0.15, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <motion.circle
                cx={pos.x} cy={pos.y}
                r={nodeR}
                fill={isHov ? color : `${color}30`}
                stroke={color}
                strokeWidth={isHov ? 0.5 : 0.25}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              />
              {/* Label */}
              <text
                x={pos.x}
                y={pos.y - nodeR - 1.2}
                textAnchor="middle"
                className={`text-[2.2px] font-mono fill-white transition-all duration-300 ${
                  isHov ? "opacity-100" : "opacity-0"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {skill.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="text-center"
        >
          <p className="font-display text-sm font-bold text-white/60 md:text-base">My Stack</p>
          <p className="font-mono text-[10px] text-white/25">{items.length} nodes</p>
        </motion.div>
      </div>
    </div>
  );
};

ConstellationMap.propTypes = {
  items: PropTypes.array.isRequired,
  onHover: PropTypes.func,
};

/* ═══════════════════════════════════
   EXPANDED SKILL DETAIL CARD
   ═══════════════════════════════════ */
const SkillDetailCard = ({ skill }) => {
  if (!skill) return null;
  const icon = iconFor(skill.name);
  const color = categoryColors[skill.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a0a0a]/90 p-6 backdrop-blur-xl"
      style={{ boxShadow: `0 0 60px ${color}12, 0 20px 60px rgba(0,0,0,0.5)` }}
    >
      {/* Top accent */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]"
          style={{ boxShadow: `0 0 30px ${color}15` }}
        >
          {icon ? (
            <img
              src={icon}
              alt={skill.name}
              className={`h-10 w-10 object-contain ${skill.name === "GitHub" ? "invert opacity-80" : ""}`}
            />
          ) : (
            <span className="text-2xl font-bold" style={{ color }}>{skill.name.charAt(0)}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-bold text-white">{skill.name}</h3>
            <span
              className="shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px]"
              style={{ borderColor: `${color}35`, color }}
            >
              Lvl {skill.level}
            </span>
          </div>
          <p className="mt-1 text-xs text-white/45">{skill.description}</p>
        </div>
      </div>

      {/* Proficiency bar */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-[0.16em] text-white/30">Proficiency</span>
          <span className="text-[10px] font-mono text-white/40">{levelLabels[skill.level]}</span>
        </div>
        <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: skill.level / 5 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="absolute inset-y-0 left-0 origin-left rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
        {/* Level dots */}
        <div className="mt-2.5 flex items-center gap-1.5">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className="block h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: i < skill.level ? color : "rgba(255,255,255,0.06)",
                boxShadow: i < skill.level ? `0 0 6px ${color}44` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Category tag */}
      <div className="mt-4 flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium"
          style={{ borderColor: `${color}25`, color, backgroundColor: `${color}08` }}
        >
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
};

SkillDetailCard.propTypes = {
  skill: PropTypes.object,
};

/* ═══════════════════════════════════
   SKILL CARD (for list view)
   ═══════════════════════════════════ */
const SkillListItem = ({ skill, index }) => {
  const icon = iconFor(skill.name);
  const color = categoryColors[skill.category];

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.03, ease: EASE }}
      className="group flex items-center gap-4 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3 transition-all duration-400 hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03]">
        {icon ? (
          <img
            src={icon}
            alt={skill.name}
            loading="lazy"
            className={`h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110 ${skill.name === "GitHub" ? "invert opacity-80" : ""}`}
          />
        ) : (
          <span className="text-sm font-bold" style={{ color }}>{skill.name.charAt(0)}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-display text-sm font-semibold text-white/85 group-hover:text-white truncate transition-colors">
            {skill.name}
          </h4>
          <span
            className="shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px]"
            style={{ borderColor: `${color}25`, color }}
          >
            {levelLabels[skill.level]}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-white/35 truncate">{skill.description}</p>
      </div>

      {/* Dots */}
      <div className="hidden sm:flex items-center gap-1 shrink-0">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className="block h-1.5 w-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i < skill.level ? color : "rgba(255,255,255,0.06)",
              boxShadow: i < skill.level ? `0 0 4px ${color}33` : "none",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

SkillListItem.propTypes = {
  skill: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

/* ═══════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════ */
export const Skills = () => {
  const [activeCat, setActiveCat] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState(null);

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

      {/* ═══ CONSTELLATION SECTION ═══ */}
      <section className="relative w-full px-5 py-16 md:py-24 overflow-hidden">
        <div className="pointer-events-none absolute right-[-5%] top-[10%] h-[500px] w-[500px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-[0.05] blur-[150px]" />
        <div className="pointer-events-none absolute left-[-5%] bottom-[10%] h-[400px] w-[400px] bg-[radial-gradient(#06b6d4_0%,transparent_70%)] opacity-[0.03] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Section label */}
          <motion.div {...reveal()} className="text-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#bf4417]/20 bg-[#bf4417]/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#bf4417]/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#bf4417] animate-pulse" />
              Interactive Map
            </span>
          </motion.div>

          <motion.h2
            {...reveal(0.05)}
            className="text-center font-display text-2xl font-bold text-white/90 md:text-3xl"
          >
            Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] to-amber-500">Galaxy</span>
          </motion.h2>
          <motion.p
            {...reveal(0.1)}
            className="mt-3 text-center text-sm text-white/40 max-w-md mx-auto"
          >
            Hover over any node to reveal its details. Outer ring = advanced skills, inner ring = growing skills.
          </motion.p>

          <motion.div {...reveal(0.15)} className="mt-10">
            <ConstellationMap items={filtered} onHover={setHoveredSkill} />
          </motion.div>

          {/* Hovered skill detail */}
          <div className="mt-8 min-h-[200px]">
            <AnimatePresence mode="wait">
              {hoveredSkill ? (
                <SkillDetailCard key={hoveredSkill.name} skill={hoveredSkill} />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-white/10 bg-white/[0.02]">
                    <Eye size={20} className="text-white/20" />
                  </div>
                  <p className="mt-4 text-sm text-white/25">Hover a node to explore</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══ FULL LIST SECTION ═══ */}
      <section className="relative w-full border-t border-white/[0.04] px-5 py-16 md:py-24">
        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Section label */}
          <motion.div {...reveal()} className="text-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              <Layers size={12} />
              Full Directory
            </span>
          </motion.div>

          <motion.h2 {...reveal(0.05)} className="text-center font-display text-2xl font-bold text-white/90 md:text-3xl">
            Every Tool in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] to-amber-500">Arsenal</span>
          </motion.h2>

          {/* Filters */}
          <motion.div {...reveal(0.1)} className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {skillCategories.map((cat) => {
              const active = activeCat === cat.id;
              const Icon = catIcons[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium transition-all duration-400 ${
                    active
                      ? "bg-[#bf4417] text-white shadow-[0_0_20px_rgba(191,68,23,0.4)]"
                      : "border border-white/[0.08] bg-white/[0.02] text-white/45 hover:border-[#bf4417]/40 hover:text-white/80"
                  }`}
                >
                  <Icon size={14} className={active ? "text-white" : "text-white/50"} />
                  {cat.label}
                  <span className={`font-mono text-[10px] ${active ? "text-white/60" : "text-white/20"}`}>
                    {catCounts[cat.id] || 0}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Legend */}
          <motion.div {...reveal(0.12)} className="mt-4 flex items-center justify-center gap-5 text-[10px] uppercase tracking-[0.16em] text-white/20">
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f97316]" /> Frontend
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#06b6d4]" /> Backend
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a855f7]" /> Tools
            </span>
          </motion.div>

          {/* Skill list */}
          <motion.div layout className="mt-10 grid gap-2 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((skill, i) => (
                <SkillListItem key={skill.name} skill={skill} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty */}
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-20 text-center text-white/30">
                <p className="font-display text-lg">No skills in this category yet.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
};

export default Skills;
