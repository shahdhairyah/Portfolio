import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Star, Briefcase, ExternalLink, ArrowUpRight, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";
import { EASE } from "./ease";
import { GithubIcon } from "./effects";

/* ═══════════════════════════════════════════
   TERMINAL CARD
   ═══════════════════════════════════════════ */
export const TerminalCard = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const lines = [
    { cmd: "whoami", out: "Shah Dhairya — Full-Stack Developer & Digital Architect" },
    { cmd: "echo $STACK", out: "React · PHP · Python · Node.js · MySQL · Tailwind CSS" },
    { cmd: "open new_ideas --as collab", out: "Available for freelance work & collaborations" },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % lines.length);
    }, 3200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#0a0a0a] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/[0.08]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] font-mono text-white/55 truncate">shah@dhairya — sdh</span>
      </div>
      <div className="px-5 py-6 font-mono text-[13px] leading-7 space-y-4">
        {lines.map((line, i) => (
          <div key={i} className={`transition-opacity duration-500 ${i === currentLine ? "opacity-100" : "opacity-40"}`}>
            <p>
              <span className="text-[#4ade80]">$</span> <span className="text-white/85">{line.cmd}</span>
            </p>
            <p className="text-white/55 pl-4">{line.out}</p>
          </div>
        ))}
        <p className="mt-2">
          <span className="text-[#4ade80]">$</span>{" "}
          <span className="inline-block w-2 h-4 bg-[#4ade80] align-middle animate-blink" />
        </p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   FEATURED PROJECT CARD
   ═══════════════════════════════════════════ */
export const FeaturedProjectCard = ({ project }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.03] overflow-hidden hover:border-[#bf4417]/30 transition-all duration-500"
    >
      <div className="relative w-full h-[280px] md:h-[400px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent" />
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.status}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            {project.category}
          </span>
        </div>
        <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-[#bf4417]/20 border border-[#bf4417]/40 text-[#ff9a4d] text-[10px] font-mono font-bold backdrop-blur-md">
          {project.year}
        </div>
        {project.featured && (
          <div className="absolute bottom-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#bf4417]/20 border border-[#bf4417]/40 text-[#ff9a4d] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            <Star size={12} fill="currentColor" />
            Featured
          </div>
        )}
      </div>

      <div className="p-7 md:p-9">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/50">
            <Briefcase size={12} />
            {project.role}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold font-display text-white tracking-tight group-hover:text-[#ff9a4d] transition-colors duration-300">
          {project.title}
        </h3>

        <p className="mt-3 text-sm text-white/50 leading-relaxed font-light line-clamp-3">{project.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-medium text-white/60">
              {s}
            </span>
          ))}
        </div>

        {project.stats && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.stats.map((st) => (
              <div key={st.label} className="text-center p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-xs font-bold text-[#ff9a4d]">{st.value}</div>
                <div className="text-[9px] uppercase tracking-wider text-white/50 mt-0.5">{st.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#bf4417] to-[#991b1b] hover:from-[#ea580c] hover:to-[#7f1d1d] text-white text-xs font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(191,68,23,0.2)] hover:shadow-[0_0_30px_rgba(191,68,23,0.4)]"
            >
              <ExternalLink size={13} />
              Live Demo
              <ArrowUpRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-white/25 text-white/50 hover:text-white text-xs font-medium rounded-xl transition-all duration-300"
            >
              <GithubIcon size={13} />
              Source Code
            </a>
          )}
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-[#bf4417]/40 text-white/50 hover:text-[#ff9a4d] text-xs font-medium rounded-xl transition-all duration-300 ml-auto"
          >
            Case Study
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

FeaturedProjectCard.propTypes = { project: PropTypes.object.isRequired };

/* ═══════════════════════════════════════════
   PHILOSOPHY CARD — principle panel
   ═══════════════════════════════════════════ */
export const PhilosophyCard = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 overflow-hidden hover:border-[#bf4417]/30 transition-colors duration-500"
    >
      <span className="font-mono text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#bf4417]/60 to-[#bf4417]/10">{item.num}</span>
      <h3 className="mt-6 text-xl font-extrabold font-display text-white">{item.title}</h3>
      <p className="mt-3 text-sm text-white/60 leading-relaxed font-light">{item.text}</p>
    </motion.div>
  );
};

PhilosophyCard.propTypes = { item: PropTypes.object.isRequired, index: PropTypes.number.isRequired };

/* ═══════════════════════════════════════════
   Section eyebrow helper
   ═══════════════════════════════════════════ */
export const SectionEyebrow = ({ icon: Icon, children, center }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bf4417]/10 border border-[#bf4417]/30 text-[#ff8a5c] text-xs font-semibold uppercase tracking-wider ${center ? "mx-auto" : ""}`}>
    {Icon && <Icon size={14} />}
    {children}
  </div>
);

SectionEyebrow.propTypes = { icon: PropTypes.any, children: PropTypes.node, center: PropTypes.bool };
