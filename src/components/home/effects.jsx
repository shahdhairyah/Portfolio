import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import PropTypes from "prop-types";
import { EASE } from "./ease";

const ROLES = [
  "Full-Stack Developer",
  "Digital Architect",
  "AI & IoT Enthusiast",
  "Problem Solver",
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?";

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

export const ParticleField = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {particles.map((p) => (
      <motion.div
        key={p.id}
        className="absolute rounded-full bg-[#bf4417]/30"
        style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
        animate={{ y: [0, -80, 0], opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
      />
    ))}
  </div>
);

/* ═══════════════════════════════════════════
   ORBIT RING — rotating ring with tech dots
   ═══════════════════════════════════════════ */
const orbitTechs = ["React", "PHP", "Python", "Node.js", "MySQL", "Tailwind", "Git", "Vite"];

export const OrbitRing = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px]">
      <div className="absolute inset-0 rounded-full border border-dashed border-[#bf4417]/15" />
      <div className="absolute inset-6 rounded-full border border-[#bf4417]/8" />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% 240px" }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#bf4417] shadow-[0_0_12px_rgba(191,68,23,0.6)]" />
      </motion.div>
      {orbitTechs.map((tech, i) => {
        const angle = (i / orbitTechs.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const radius = 46;
        const x = 50 + radius * Math.sin(rad);
        const y = 50 - radius * Math.cos(rad);
        return (
          <div
            key={tech}
            className="absolute text-[9px] font-mono text-white/45 uppercase tracking-wider hidden md:block"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
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
export const GlitchText = ({ children, className }) => {
  const [glitch, setGlitch] = useState(false);
  const timers = useRef([]);

  const trigger = useCallback(() => {
    setGlitch(true);
    const id = setTimeout(() => setGlitch(false), 220);
    timers.current.push(id);
  }, []);

  useEffect(() => {
    trigger();
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, [trigger]);

  return (
    <span
      className={`relative inline-block ${className || ""}`}
      onMouseEnter={trigger}
    >
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
export const MagneticButton = ({ children, className, href, to, ...props }) => {
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
    <Tag ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave} style={style} {...extra} {...props}>
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
   TEXT SCRAMBLE — decode effect on load
   ═══════════════════════════════════════════ */
export const ScrambleText = ({ text, className, delay = 0 }) => {
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
      if (iteration <= total) frameRef.current = requestAnimationFrame(tick);
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

ScrambleText.propTypes = { text: PropTypes.string.isRequired, className: PropTypes.string, delay: PropTypes.number };

/* ═══════════════════════════════════════════
   MOUSE GLOW — radial gradient follows cursor
   ═══════════════════════════════════════════ */
export const MouseGlow = () => {
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
export const AnimatedRole = () => {
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
const rotatingWords = ["Web Applications", "AI Systems", "IoT Solutions", "Dashboards"];

export const RotatingWord = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % rotatingWords.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="absolute left-0 bottom-0 text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b] font-semibold whitespace-nowrap"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ═══════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════ */
export const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
GithubIcon.propTypes = { size: PropTypes.number };

export const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
LinkedinIcon.propTypes = { size: PropTypes.number };
