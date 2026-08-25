import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import PropTypes from "prop-types";
import {
  ArrowUpRight,
  FileText,
  Mail,
  Code2,
  Send,
  Sparkles,
  Globe,
  Rocket,
  ExternalLink,
  Briefcase,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { identity, socials, stats } from "@/data/profile";

const EASE = [0.16, 1, 0.3, 1];

const ROLES = [
  "Full-Stack Developer",
  "Digital Architect",
  "AI & IoT Enthusiast",
  "Problem Solver",
];

const TICKER = [
  "React", "PHP", "Python", "Node.js", "MySQL",
  "Tailwind CSS", "REST APIs", "Git", "GitHub", "Vite",
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?";

const floatingIcons = [
  { icon: Code2, pos: "top-[12%] left-[6%] md:left-[10%]", anim: "4.2s", size: 20 },
  { icon: Globe, pos: "bottom-[20%] left-[8%] md:left-[14%]", anim: "5.1s", size: 18 },
  { icon: Rocket, pos: "top-[15%] right-[6%] md:right-[11%]", anim: "3.9s", size: 20 },
  { icon: Sparkles, pos: "bottom-[22%] right-[8%] md:right-[13%]", anim: "4.7s", size: 18 },
];

/* ═══════════════════════════════════════════
   PARTICLE FIELD — floating dots
   ═══════════════════════════════════════════ */
const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 10,
}));

const ParticleField = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {particles.map((p) => (
      <motion.div
        key={p.id}
        className="absolute rounded-full bg-[#bf4417]/30"
        style={{
          width: p.size,
          height: p.size,
          left: `${p.x}%`,
          top: `${p.y}%`,
        }}
        animate={{
          y: [0, -80, 0],
          opacity: [0.15, 0.5, 0.15],
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          delay: p.delay,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

/* ═══════════════════════════════════════════
   ORBIT RING — rotating ring with tech dots
   ═══════════════════════════════════════════ */
const orbitTechs = ["React", "PHP", "Python", "Node.js", "MySQL", "Tailwind", "Git", "Vite"];

const OrbitRing = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px]">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-[#bf4417]/15" />
      {/* Inner ring */}
      <div className="absolute inset-6 rounded-full border border-[#bf4417]/8" />
      {/* Spinning dot */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% 240px" }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#bf4417] shadow-[0_0_12px_rgba(191,68,23,0.6)]" />
      </motion.div>
      {/* Tech dots on ring */}
      {orbitTechs.map((tech, i) => {
        const angle = (i / orbitTechs.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const radius = 46;
        const x = 50 + radius * Math.sin(rad);
        const y = 50 - radius * Math.cos(rad);
        return (
          <div
            key={tech}
            className="absolute text-[9px] font-mono text-white/20 uppercase tracking-wider hidden md:block"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {tech}
          </div>
        );
      })}
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   GLITCH TEXT — periodic glitch on name
   ═══════════════════════════════════════════ */
const GlitchText = ({ children, className }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    };
    const id = setInterval(trigger, 5000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`relative inline-block ${className || ""}`}>
      <span className="relative z-10">{children}</span>
      {glitch && (
        <>
          <span
            className="absolute inset-0 text-[#bf4417] opacity-70 z-20"
            style={{ clipPath: "inset(20% 0 60% 0)", transform: "translate(-2px, 1px)" }}
            aria-hidden
          >
            {children}
          </span>
          <span
            className="absolute inset-0 text-cyan-400 opacity-50 z-20"
            style={{ clipPath: "inset(60% 0 10% 0)", transform: "translate(2px, -1px)" }}
            aria-hidden
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
};

GlitchText.propTypes = { children: PropTypes.node, className: PropTypes.string };

/* ═══════════════════════════════════════════
   MAGNETIC BUTTON — follows cursor slightly
   ═══════════════════════════════════════════ */
const MagneticButton = ({ children, className, href, to, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  }, [x, y]);

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const style = { x: springX, y: springY };

  const Tag = to ? Link : href ? "a" : "button";
  const extra = to ? { to } : href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      {...extra}
      {...props}
    >
      {children}
    </Tag>
  );
};

MagneticButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  to: PropTypes.string,
};

/* ═══════════════════════════════════════════
   ANIMATED COUNTER — counts up on view
   ═══════════════════════════════════════════ */
const AnimatedCounter = ({ value, label, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const numericPart = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || isNaN(numericPart)) return;
    let start = 0;
    const duration = 1500;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * numericPart));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, numericPart]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className="group relative flex flex-col items-center p-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:border-[#bf4417]/30 hover:bg-white/[0.05] transition-all duration-300"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-[#bf4417]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="font-display text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] to-[#ff9a4d]">
        {inView && !isNaN(numericPart) ? `${count}${suffix}` : value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </div>
    </motion.div>
  );
};

AnimatedCounter.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

/* ═══════════════════════════════════════════
   TEXT SCRAMBLE — decode effect on load
   ═══════════════════════════════════════════ */
const ScrambleText = ({ text, className, delay = 0 }) => {
  const [display, setDisplay] = useState("");
  const frameRef = useRef(null);

  useEffect(() => {
    let iteration = 0;
    const total = text.length;
    let timeout;

    const tick = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (i < iteration) return char;
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration <= total) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay]);

  return <span className={className}>{display}</span>;
};

ScrambleText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
};

/* ═══════════════════════════════════════════
   MOUSE GLOW — radial gradient follows cursor
   ═══════════════════════════════════════════ */
const MouseGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const onMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div ref={containerRef} onMouseMove={onMove} className="absolute inset-0 pointer-events-auto">
      <div
        className="pointer-events-none absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
        style={{
          left: pos.x,
          top: pos.y,
          background: "radial-gradient(circle, #bf4417 0%, transparent 70%)",
          transition: "left 0.15s ease-out, top 0.15s ease-out",
        }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════
   ANIMATED ROLE
   ═══════════════════════════════════════════ */
const AnimatedRole = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="absolute left-0 bottom-0 text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-500 to-[#ff9a4d] font-semibold whitespace-nowrap"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ═══════════════════════════════════════════
   ROTATING WORD
   ═══════════════════════════════════════════ */
const RotatingWord = () => {
  const words = ["Web Applications", "AI Systems", "IoT Solutions", "Dashboards"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="absolute left-0 bottom-0 text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b] font-semibold whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ═══════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════ */
const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
GithubIcon.propTypes = { size: PropTypes.number };

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
LinkedinIcon.propTypes = { size: PropTypes.number };

/* ═══════════════════════════════════════════
   TERMINAL CARD
   ═══════════════════════════════════════════ */
const TerminalCard = () => {
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
    <div className="rounded-2xl bg-[#0a0a0a] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/[0.08] h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] font-mono text-white/40 truncate">
          shah@dhairya — sdh
        </span>
      </div>
      <div className="px-5 py-6 font-mono text-[13px] leading-7 space-y-4 min-h-[200px]">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`transition-opacity duration-500 ${
              i === currentLine ? "opacity-100" : "opacity-25"
            }`}
          >
            <p>
              <span className="text-[#4ade80]">$</span>{" "}
              <span className="text-white/85">{line.cmd}</span>
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
const FeaturedProjectCard = ({ project }) => {
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
      {/* Image */}
      <div className="relative w-full h-[280px] md:h-[420px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent" />
        {/* Status badge */}
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.status}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            {project.category}
          </span>
        </div>
        {/* Year badge */}
        <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-[#bf4417]/20 border border-[#bf4417]/40 text-[#ff9a4d] text-[10px] font-mono font-bold backdrop-blur-md">
          {project.year}
        </div>
        {/* Featured star */}
        <div className="absolute bottom-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#bf4417]/20 border border-[#bf4417]/40 text-[#ff9a4d] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
          <Star size={12} fill="currentColor" />
          Featured
        </div>
      </div>

      {/* Content */}
      <div className="p-7 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/40">
            <Briefcase size={12} />
            {project.role}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold font-display text-white tracking-tight group-hover:text-[#ff9a4d] transition-colors duration-300">
          {project.title}
        </h3>

        <p className="mt-3 text-sm text-white/50 leading-relaxed font-light line-clamp-3">
          {project.tagline}
        </p>

        {/* Stack */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-medium text-white/60"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Stats */}
        {project.stats && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.stats.map((st) => (
              <div key={st.label} className="text-center p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-xs font-bold text-[#ff9a4d]">{st.value}</div>
                <div className="text-[9px] uppercase tracking-wider text-white/35 mt-0.5">{st.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Links */}
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

FeaturedProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};

/* ═══════════════════════════════════════════
   JSON-LD
   ═══════════════════════════════════════════ */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shah Dhairya",
  alternateName: "Dhairya Shah",
  url: "https://shahdhairyah.in/",
  image: "https://shahdhairyah.in/og-image.png",
  jobTitle: "Full-Stack Developer",
  sameAs: ["https://github.com/shahdhairyah", "https://www.linkedin.com/in/shahdhairyah/"],
  knowsAbout: ["PHP", "JavaScript", "React", "Python", "MySQL", "HTML", "CSS", "Tailwind CSS"],
};

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
const Home = () => {
  const location = useLocation();
  const github = socials.find((s) => s.label === "GitHub")?.href;
  const linkedin = socials.find((s) => s.label === "LinkedIn")?.href;

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  return (
    <div className="w-full bg-[#020202] overflow-hidden">
      <SEO
        title="Shah Dhairya – Full-Stack Developer & Digital Architect"
        description="Portfolio of Shah Dhairya, a full-stack developer building products with React, Node.js, Python and PHP."
        path="/"
        jsonLd={personJsonLd}
      />

      {/* ═══════════════════════════════════════════
          HERO SECTION
         ═══════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(#bf4417_0%,transparent_55%)] opacity-15 blur-[120px]" />

        <ParticleField />
        <MouseGlow />
        <OrbitRing />

        {/* Giant watermark text */}
        <div aria-hidden className="pointer-events-none select-none absolute inset-0 flex items-center justify-center">
          <span className="block text-center font-display font-extrabold leading-[0.85] text-[18vw] md:text-[14rem] text-transparent [-webkit-text-stroke:1.5px_rgba(191,68,23,0.06)] whitespace-nowrap">
            <span className="block">SHAH</span>
            <span className="block">DHAIRYA</span>
          </span>
        </div>

        {floatingIcons.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.8 + i * 0.1 }}
              className={`absolute ${item.pos} z-20 rounded-xl border border-[#bf4417]/25 bg-white/[0.04] p-3 text-[#bf4417]/70 backdrop-blur-md animate-bounce`}
              style={{ animationDuration: item.anim }}
            >
              <Icon size={item.size} />
            </motion.div>
          );
        })}

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-32 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[11px] uppercase tracking-[0.3em] text-white/20 font-medium mb-10"
          >
            Full-Stack Developer &amp; Digital Architect
          </motion.p>

          {/* SCRAMBLE NAME with GLITCH */}
          <h1 className="font-display font-extrabold tracking-[-0.04em] leading-[0.85] select-none text-[clamp(3.5rem,12vw,9rem)]">
            <span className="block text-white">
              <GlitchText>
                <ScrambleText text="Shah" delay={300} />
              </GlitchText>
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-[#ea580c] to-[#ff9a4d]">
              <GlitchText>
                <ScrambleText text="Dhairya" delay={600} />
              </GlitchText>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 text-base sm:text-lg text-white/40 font-light tracking-wide"
          >
            <AnimatedRole />
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.5, ease: EASE }}
            className="mt-10 w-24 h-px bg-gradient-to-r from-transparent via-[#bf4417]/50 to-transparent origin-center"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="mt-8 max-w-lg text-white/30 text-sm sm:text-base leading-relaxed font-light"
          >
            Crafting fast, reliable web applications with clean engineering
            — from interface to infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.9, ease: EASE }}
            className="mt-10 flex items-center gap-4"
          >
            <MagneticButton
              to="/projects"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#bf4417] to-[#991b1b] hover:from-[#ea580c] hover:to-[#7f1d1d] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(191,68,23,0.3)] hover:shadow-[0_0_50px_rgba(191,68,23,0.5)]"
            >
              View Work
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <MagneticButton
              href="/Dhairya-Shah-Resume.pdf"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/10 hover:border-white/25 text-white/50 hover:text-white text-sm font-medium rounded-xl transition-all duration-300"
            >
              <FileText size={14} />
              Resume
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.1 }}
            className="mt-14 flex items-center gap-4"
          >
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-white/20 hover:text-white/60 transition-colors duration-300">
              <GithubIcon size={18} />
            </a>
            <span className="w-px h-3 bg-white/10" />
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-white/20 hover:text-white/60 transition-colors duration-300">
              <LinkedinIcon size={18} />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/20">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>

        {/* Hero marquee ticker */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.04] bg-white/[0.01] py-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max gap-10 animate-marquee-left">
            {[...TICKER, ...TICKER].map((w, i) => (
              <span key={i} className="flex items-center gap-10 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                <span className="text-white/15">{w}</span>
                <span className="text-[#bf4417]/30">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INTRO — BENTO GRID
         ═══════════════════════════════════════════ */}
      <section className="relative w-full py-20 md:py-28 px-6">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
        <div className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[600px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[120px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bf4417]/10 border border-[#bf4417]/30 text-[#ff8a5c] text-xs font-semibold uppercase tracking-wider mb-10"
          >
            <Sparkles size={14} />
            Introduction
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">

            {/* BIO — large left */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="md:col-span-7 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-10 hover:border-[#bf4417]/30 transition-colors duration-300"
            >
              <h2 className="text-3xl sm:text-5xl lg:text-[52px] leading-[1.08] tracking-tighter text-white font-extrabold font-display">
                Designing and Engineering <br />
                <RotatingWord />.
              </h2>
              <p className="mt-6 text-white/50 text-base leading-relaxed font-light">
                I build production-ready digital products for startups, academic
                institutions, and businesses — turning complex requirements into
                reliable, scalable web applications.
              </p>
              <p className="mt-4 text-sm text-white/35 leading-relaxed">
                From custom applications and management portals to modernizing
                legacy systems, I work across the full development lifecycle. My
                expertise includes{" "}
                <strong className="text-white/70 font-medium">
                  React, PHP, Python, MySQL, Node.js, and Tailwind CSS
                </strong>
                — building software designed not just to work, but to scale.
              </p>
            </motion.div>

            {/* TERMINAL — right tall */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="md:col-span-5 md:row-span-2"
            >
              <TerminalCard />
            </motion.div>

            {/* CONTACT PILLS */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className="md:col-span-7 flex flex-wrap gap-3"
            >
              <a href={`mailto:${identity.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/60 hover:text-[#bf4417] hover:border-[#bf4417]/40 transition-all duration-200">
                <Mail size={16} className="text-[#bf4417]" />
                <span className="text-sm">{identity.email}</span>
              </a>
              <a href={github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/60 hover:text-white hover:border-white/25 transition-all duration-200">
                <GithubIcon size={16} />
                <span className="text-sm">GitHub</span>
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/60 hover:text-[#0077b5] hover:border-[#0077b5]/40 transition-all duration-200">
                <LinkedinIcon size={16} className="text-[#0077b5]" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </motion.div>

            {/* STATS — animated counters */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="md:col-span-12"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s, i) => (
                  <AnimatedCounter key={s.label} value={s.value} label={s.label} index={i} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tech Ticker — dual direction */}
          <div className="mt-14 border-y border-white/[0.06] bg-white/[0.02] py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex w-max gap-8 animate-marquee-left">
              {[...TICKER, ...TICKER].map((w, i) => (
                <span key={i} className="flex items-center gap-8 text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] to-[#991b1b]">{w}</span>
                  <span className="text-white/15">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SKILLS MARQUEE — dual direction
         ═══════════════════════════════════════════ */}
      <section className="relative w-full py-16 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[800px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-6 blur-[100px]" />

        <div className="relative z-10 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap size={13} />
              Tech Stack
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-syne tracking-tight text-white">
              Technologies I{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] to-[#ff9a4d]">
                Work With
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Row 1 — left */}
        <div className="border-y border-white/[0.04] py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max gap-8 animate-marquee-left">
            {[...TICKER, ...TICKER, ...TICKER].map((w, i) => (
              <span key={i} className="flex items-center gap-8 text-base font-bold uppercase tracking-wider whitespace-nowrap">
                <span className="text-white/10 hover:text-[#bf4417] transition-colors duration-300 cursor-default">{w}</span>
                <span className="text-[#bf4417]/20">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — right (reversed) */}
        <div className="border-b border-white/[0.04] py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max gap-8 animate-marquee-right">
            {[...TICKER, ...TICKER, ...TICKER].map((w, i) => (
              <span key={i} className="flex items-center gap-8 text-base font-bold uppercase tracking-wider whitespace-nowrap">
                <span className="text-white/10 hover:text-[#bf4417] transition-colors duration-300 cursor-default">{w}</span>
                <span className="text-[#bf4417]/20">•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA SECTION
         ═══════════════════════════════════════════ */}
      <section id="contact" className="relative w-full py-20 md:py-28 px-6">
        <div className="pointer-events-none absolute right-1/4 top-1/2 h-[400px] w-[600px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#ff8a5c]">
            Get in Touch
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Let&apos;s Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b]">
              Great
            </span>
          </h2>
          <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I&apos;m always open to
            discussing new opportunities and creative ideas.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={`mailto:${identity.email}`}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#bf4417] to-[#991b1b] hover:from-[#ea580c] hover:to-[#7f1d1d] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(191,68,23,0.3)] hover:shadow-[0_0_50px_rgba(191,68,23,0.5)]"
            >
              <Send size={15} />
              Contact Me
            </MagneticButton>
            <MagneticButton
              to="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3.5 border border-white/10 hover:border-white/25 text-white/50 hover:text-white text-sm font-medium rounded-xl transition-all duration-300"
            >
              <Code2 size={15} className="text-[#bf4417]" />
              View Projects
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export { Home };
export default Home;
