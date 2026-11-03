import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Layers, Monitor, Server, Wrench,
  ChevronRight, Folder, Hash, ArrowUpRight,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PageCTA from "@/components/shared/PageCTA";
import BlurText from "@/components/reactbits/BlurText";
import ClickSpark from "@/components/reactbits/ClickSpark";
import CountUp from "@/components/reactbits/CountUp";
import DotGrid from "@/components/reactbits/DotGrid";
import GradientText from "@/components/reactbits/GradientText";
import { SectionEyebrow } from "@/components/home/cards";
import { SEO } from "@/components/SEO";
import {
  skills,
  skillCategories,
  categoryColors,
  skillTiers,
  tierFor,
  projectsUsingSkill,
} from "@/data/skills";
import { projects } from "@/data/projects";

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
const coreCount = skills.filter((s) => s.tier === "core").length;

/* ═══ HEADER ═══ */
const SkillsHeader = () => (
  <PageHeader
    title={"THE\nCRAFT"}
    kicker="cat stack.json | jq"
    subtitle="Every project starts with the right tools. Here's the set I reach for — honed across builds, deadlines and late-night debug sessions."
  />
);

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
          : "text-white/50 hover:text-white/70 hover:bg-white/[0.03] border border-transparent"
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
const SkillGridCard = forwardRef(({ skill, index, onHover }, ref) => {
  const icon = iconFor(skill.name);
  const color = categoryColors[skill.category];
  const tier = tierFor(skill.tier);
  const isCore = skill.tier === "core";
  const usedIn = projectsUsingSkill(skill.name, projects);

  return (
    <motion.button
      ref={ref}
      type="button"
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: EASE }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(skill.name)}
      onBlur={() => onHover(null)}
      className="group relative flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center transition-all duration-300 hover:border-[#bf4417]/25 hover:bg-white/[0.045] cursor-pointer"
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
      <h4 className="font-display text-sm font-bold text-white/90 group-hover:text-white transition-colors">
        {skill.name}
      </h4>

{/* Description */}
      <p className="text-[11px] text-white/55 leading-relaxed line-clamp-2">
        {skill.description}
      </p>

      {/* Usage badge — how the tech is actually applied */}
      <div className="mt-auto w-full flex flex-col items-center gap-2 pt-1">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider border ${
            isCore
              ? "bg-[#bf4417]/12 border-[#bf4417]/40 text-[#ff9a4d]"
              : "bg-white/[0.03] border-white/10 text-white/55"
          }`}
        >
          {tier.label}
        </span>
        <span className="font-mono text-[10px] text-white/50">
          {usedIn.length > 0
            ? `${usedIn.length} project${usedIn.length === 1 ? "" : "s"}`
            : "Tooling"}
        </span>
      </div>
    </motion.button>
  );
});

SkillGridCard.displayName = "SkillGridCard";

SkillGridCard.propTypes = {
  skill: PropTypes.object.isRequired,
  index: PropTypes.number,
  onHover: PropTypes.func.isRequired,
};

/* ═══ PROJECTS USING HOVERED SKILL ═══ */
const SkillProjectLinks = ({ skillName }) => {
  const matched = skillName ? projectsUsingSkill(skillName, projects) : [];

  return (
    <div className="mt-4 min-h-[76px] rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
      <AnimatePresence mode="wait">
        {skillName && matched.length > 0 ? (
          <motion.div
            key={skillName}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
              {skillName} used in
            </p>
            <div className="flex flex-wrap gap-2">
              {matched.map((p) => (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className="group inline-flex items-center gap-2 rounded-lg border border-[#bf4417]/30 bg-[#bf4417]/10 px-3 py-1.5 text-[11px] font-medium text-[#ff9a4d] transition-colors hover:border-[#bf4417]/70 hover:bg-[#bf4417]/20"
                >
                  {p.title}
                  <ArrowUpRight
                    size={11}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] text-white/45"
          >
            Hover any technology to see the projects it was used in.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

SkillProjectLinks.propTypes = { skillName: PropTypes.string };

/* ═══ MAIN ═══ */
export const Skills = () => {
  const [activeCat, setActiveCat] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const filtered =
    activeCat === "all"
      ? skills
      : skills.filter((s) => s.category === activeCat);

  return (
    <ClickSpark color="#ff9a4d" count={10} size={14} radius={34} className="relative w-full overflow-x-clip bg-[#020202]">
      <SEO
        title="Shah Dhairya's Skills – React, Node.js, Python, MySQL"
        description="Technical skills of Shah Dhairya: React, PHP, Python, MySQL, Tailwind CSS, Git, and more."
        path="/skills"
        jsonLd={breadcrumbJsonLd}
      />

      <SkillsHeader />

      {/* ═══ EXPLORER SECTION ═══ */}
      <section className="relative w-full overflow-x-clip px-5 py-14 md:py-20">
        <DotGrid className="opacity-25" dotSize={1.5} gap={32} radius={160} activeColor="#ff9a4d" />
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[500px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Section label */}
          <motion.div {...reveal()} className="text-center mb-5">
            <SectionEyebrow icon={Folder} center>
              Explorer
            </SectionEyebrow>
          </motion.div>

          <motion.h2
            {...reveal(0.05)}
            className="text-center font-display text-3xl font-extrabold tracking-tight text-white md:text-5xl"
          >
            <BlurText text="Browse the" className="block" />
            <GradientText className="mt-1 block" speed={7} glow={0.2}>
              Toolkit
            </GradientText>
          </motion.h2>
<motion.p
            {...reveal(0.1)}
            className="mt-3 text-center text-sm text-white/60 max-w-md mx-auto"
          >
            Navigate by category on the left, explore skills on the right. Every
            skill is tagged by how it&apos;s used in production work.
          </motion.p>

          <motion.div
            {...reveal(0.1)}
            className="mx-auto mt-7 flex w-fit items-center divide-x divide-white/10 overflow-hidden rounded-full border border-white/10 bg-white/[0.02]"
          >
            <div className="px-5 py-2.5 text-center">
              <span className="font-display text-xl font-extrabold text-white">
                <CountUp to={skills.length} suffix="+" />
              </span>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/50">Technologies</p>
            </div>
            <div className="px-5 py-2.5 text-center">
              <span className="font-display text-xl font-extrabold text-white">
                <CountUp to={3} />
              </span>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/50">Categories</p>
            </div>
            <div className="px-5 py-2.5 text-center">
              <span className="font-display text-xl font-extrabold text-white">
                <CountUp to={coreCount} />
              </span>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/50">Core stack</p>
            </div>
          </motion.div>

          <motion.div
            {...reveal(0.12)}
            className="mt-8 grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto text-left"
          >
            {skillTiers.map((tier) => (
              <div
                key={tier.id}
                className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff9a4d]">
                  {tier.label}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                  {tier.blurb}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {skills
                    .filter((s) => s.tier === tier.id)
                    .map((s) => (
                      <span
                        key={s.name}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-white/60"
                      >
                        {s.name}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>

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
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/45">Categories</span>
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
              <div className="flex items-center gap-2 mb-5 font-mono text-[11px] text-white/45">
                <span className="text-[#bf4417]/50">skills</span>
                <ChevronRight size={10} />
                <span className="text-white/50 capitalize">{activeCat === "all" ? "all" : activeCat}</span>
                <span className="text-white/15">({filtered.length})</span>
              </div>

              {/* Grid */}
              <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <AnimatePresence mode="popLayout">
                  {filtered.map((skill, i) => (
                    <SkillGridCard
                      key={skill.name}
                      skill={skill}
                      index={i}
                      onHover={setHoveredSkill}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              <SkillProjectLinks skillName={hoveredSkill} />

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
                    <p className="mt-3 text-sm text-white/45 font-mono">No skills in this folder</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <PageCTA
        eyebrow="PUT IT TO WORK"
        title="Need this stack on"
        accent="your next build?"
        description="From interfaces to APIs and databases — let's turn the toolkit into something shipped."
      />
    </ClickSpark>
  );
};

export default Skills;
