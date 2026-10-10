import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  Code2,
  Send,
  Sparkles,
  Globe,
  Rocket,
  Briefcase,
  Zap,
  ArrowRight,
  Command,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { identity, socials, stats, philosophy } from "@/data/profile";
import { projects } from "@/data/projects";
import { EASE } from "@/components/home/ease";
import {
  ParticleField,
  OrbitRing,
  GlitchText,
  MagneticButton,
  ScrambleText,
  MouseGlow,
  AnimatedRole,
  RotatingWord,
  GithubIcon,
  LinkedinIcon,
} from "@/components/home/effects";
import {
  TerminalCard,
  FeaturedProjectCard,
  PhilosophyCard,
  SectionEyebrow,
} from "@/components/home/cards";

const TICKER = [
  "React", "PHP", "Python", "Node.js", "MySQL",
  "Tailwind CSS", "REST APIs", "Git", "GitHub", "Vite",
];

const floatingIcons = [
  { icon: Code2, pos: "top-[10%] left-[4%] xl:left-[7%]", anim: "4.2s", size: 20 },
  { icon: Globe, pos: "bottom-[30%] left-[5%] xl:left-[11%]", anim: "5.1s", size: 18 },
  { icon: Rocket, pos: "top-[14%] right-[4%] xl:right-[9%]", anim: "3.9s", size: 20 },
  { icon: Sparkles, pos: "bottom-[32%] right-[5%] xl:right-[11%]", anim: "4.7s", size: 18 },
];

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
  const featuredProjects = projects.filter((p) => p.featured);

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
              className={`absolute hidden lg:block ${item.pos} z-20 rounded-xl border border-[#bf4417]/25 bg-white/[0.04] p-3 text-[#bf4417]/70 backdrop-blur-md animate-bounce`}
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
            className="text-[11px] uppercase tracking-[0.3em] text-white/60 font-medium mb-10"
          >
            Full-Stack Developer &amp; Digital Architect
          </motion.p>

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
            className="mt-8 text-base sm:text-lg text-white/70 font-light tracking-wide"
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
            className="mt-8 max-w-lg text-white/60 text-sm sm:text-base leading-relaxed font-light"
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
              to="/resume"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/10 hover:border-white/25 text-white/70 hover:text-white text-sm font-medium rounded-xl transition-all duration-300"
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
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/70 hover:text-white transition-colors duration-300">
              <GithubIcon size={18} />
            </a>
            <span className="w-px h-3 bg-white/10" />
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/55 hover:text-white transition-colors duration-300">
              <LinkedinIcon size={18} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/45">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>

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
      <section className="relative w-full py-24 md:py-32 px-6">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
        <div className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[600px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[120px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <SectionEyebrow icon={Sparkles}>Introduction</SectionEyebrow>
          </motion.div>

          {/* Section header */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-3xl sm:text-5xl lg:text-[52px] leading-[1.08] tracking-tighter text-white font-extrabold font-display"
            >
              Designing and Engineering <RotatingWord />.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="lg:max-w-md text-white/60 text-base leading-relaxed font-light"
            >
              I build production-ready digital products for startups, academic
              institutions, and businesses — turning complex requirements into
              reliable, scalable web applications.
            </motion.p>
          </div>

          {/* Bento Grid */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto">
            {/* BIO — large left */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="md:col-span-7 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-10 hover:border-[#bf4417]/30 transition-colors duration-300"
            >
              <span className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/50 mb-6">
                <Command size={13} className="text-[#bf4417]" />
                Full lifecycle
              </span>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed font-light">
                From custom applications and management portals to modernizing
                legacy systems, I work across the full development lifecycle. My
                expertise includes{" "}
                <strong className="text-white/75 font-medium">
                  React, PHP, Python, MySQL, Node.js, and Tailwind CSS
                </strong>{" "}
                — building software designed not just to work, but to scale.
              </p>
              <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-display text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] to-[#ff9a4d]">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* TERMINAL — right */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="md:col-span-5"
            >
              <TerminalCard />
            </motion.div>

            {/* PHILOSOPHY — 3 cards */}
            {philosophy.map((item) => (
              <div key={item.num} className="md:col-span-4">
                <PhilosophyCard item={item} index={Number(item.num) - 1} />
              </div>
            ))}
          </div>

          {/* Tech Ticker */}
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
          FEATURED WORK
         ═══════════════════════════════════════════ */}
      <section className="relative w-full py-24 md:py-32 px-6">
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-[400px] w-[600px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-8 blur-[120px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <SectionEyebrow icon={Briefcase}>Featured Work</SectionEyebrow>
              <h2 className="mt-6 text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
                Selected{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] to-[#ff9a4d]">Projects</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              <Link
                to="/projects"
                className="gold-link"
              >
                View all projects
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <FeaturedProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SKILLS MARQUEE — dual direction
         ═══════════════════════════════════════════ */}
      <section className="relative w-full py-20 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[800px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-6 blur-[100px]" />

        <div className="relative z-10 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center"
          >
            <SectionEyebrow icon={Zap} center>Tech Stack</SectionEyebrow>
            <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Technologies I{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] to-[#ff9a4d]">Work With</span>
            </h2>
          </motion.div>
        </div>

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
      <section id="contact" className="relative w-full py-24 md:py-32 px-6">
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
          <p className="mt-5 text-sm text-white/60 leading-relaxed max-w-lg mx-auto">
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
