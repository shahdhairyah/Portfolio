import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion, animate, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Compass,
  Database,
  Flame,
  GraduationCap,
  Layers,
  MapPin,
  Send,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import JourneyTimeline from "@/components/JourneyTimeline";
import { SEO } from "@/components/SEO";
import { identity, stats, socials, philosophy } from "@/data/profile";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://shahdhairyah.in/" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://shahdhairyah.in/about" },
  ],
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Shah Dhairya",
    alternateName: "Dhairya Shah",
    url: "https://shahdhairyah.in/about",
    jobTitle: "Full-Stack Developer",
    sameAs: ["https://github.com/shahdhairyah", "https://www.linkedin.com/in/shahdhairyah/"],
  },
};

const EASE = [0.16, 1, 0.3, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const facts = [
  { icon: MapPin, label: "Based in", value: identity.location },
  { icon: GraduationCap, label: "Education", value: identity.education },
  {
    icon: Compass,
    label: "Exploring",
    value: "AI, gesture recognition & system design",
  },
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
      ease: EASE,
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

const headerIcons = [
  { icon: Code2, pos: "top-[15%] left-[7%] md:left-[11%]", speed: "4s", size: 24 },
  { icon: TerminalSquare, pos: "bottom-[22%] left-[9%] md:left-[15%]", speed: "5s", size: 22 },
  { icon: Layers, pos: "top-[19%] right-[7%] md:right-[12%]", speed: "4.5s", size: 24 },
  { icon: Database, pos: "bottom-[20%] right-[9%] md:right-[14%]", speed: "3.8s", size: 22 },
  { icon: Flame, pos: "top-[46%] left-[4%]", speed: "5.2s", size: 18 },
];

const AboutHeader = () => {
  return (
    <section className="relative w-full flex min-h-[340px] flex-col items-center justify-center overflow-hidden bg-[#020202] px-6 py-20 md:min-h-[440px]">
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(#bf4417_0%,transparent_60%)] opacity-20 blur-[100px] md:w-[1100px]" />

      {headerIcons.map((item, i) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            className={`absolute ${item.pos} z-20 rounded-xl border border-[#bf4417]/30 bg-white/5 p-3 text-[#bf4417] backdrop-blur-md animate-bounce`}
            style={{ animationDuration: item.speed }}
          >
            <IconComponent size={item.size} />
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
        <span className="text-sky-400">~</span> whoami
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="relative z-10 mt-4 select-none text-center font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(3rem,10vw,8rem)]"
      >
        <span className="block text-white">Behind</span>
        <span className="block">
          <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.35)]">
            The&nbsp;
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b]">
            Code
          </span>
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
        className="relative z-10 mt-6 max-w-xl text-center text-sm font-light tracking-wide text-white/60 sm:text-base"
      >
        The story, principles and path behind the work — not just what I build,
        but why I build it.
      </motion.p>
    </section>
  );
};

const ProfileSection = () => {
  return (
    <section className="relative w-full bg-[#020202] text-white px-6 pt-20 pb-20 md:pt-28 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] blur-[140px] opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div
            {...reveal()}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-6 bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-15 blur-[40px] pointer-events-none" />
              <span
                aria-hidden
                className="absolute -top-3 -left-3 h-10 w-10 border-t-2 border-l-2 border-[#bf4417]"
              />
              <span
                aria-hidden
                className="absolute -bottom-3 -right-3 h-10 w-10 border-b-2 border-r-2 border-[#bf4417]"
              />

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <img
                  src="/passport.png"
                  alt="Portrait of Shah Dhairya"
                  className="aspect-[4/5] w-full rounded-xl object-cover object-top"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#0a0a0a]/95 px-4 py-2 text-xs font-medium text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to opportunities
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.p
              {...reveal(0.05)}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bf4417]/10 border border-[#bf4417]/30 text-[#bf4417] text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles size={13} />
              Who I Am
            </motion.p>

            <motion.h2
              {...reveal(0.12)}
              className="mt-6 font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.06]"
            >
              Engineering with precision.
              <br />
              Designing with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b]">
                intent.
              </span>
            </motion.h2>

            <motion.p
              {...reveal(0.2)}
              className="mt-6 max-w-xl text-base sm:text-lg font-light leading-relaxed text-white/60"
            >
              I&apos;m Dhairya — a full-stack developer from Gujarat, India.{" "}
              {identity.statement}
            </motion.p>

            <motion.p
              {...reveal(0.26)}
              className="mt-4 max-w-xl text-sm sm:text-base font-light leading-relaxed text-white/50"
            >
              Specializing in React, Node.js, Python, PHP &amp; MySQL — from
              pixel-perfect interfaces and intuitive UX to databases, APIs, and
              deployment. Every build is measured against one bar: would this
              ship in production?
            </motion.p>

            <motion.ul {...reveal(0.32)} className="mt-8 divide-y divide-white/[0.07] border-y border-white/10">
              {facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <li key={fact.label} className="flex items-center gap-4 py-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/10 text-[#ff8a5c]">
                      <Icon size={16} />
                    </span>
                    <span className="w-36 shrink-0 text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
                      {fact.label}
                    </span>
                    <span className="text-sm text-white/80">{fact.value}</span>
                  </li>
                );
              })}
            </motion.ul>

            <motion.div {...reveal(0.38)} className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#bf4417] hover:bg-[#c2410c] text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-[0_0_25px_rgba(191,68,23,0.35)]"
              >
                Get in touch
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] border border-white/15 hover:border-[#bf4417]/60 hover:text-white text-white/80 text-sm font-medium rounded-xl transition-all duration-200"
              >
                View résumé
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.dl {...reveal(0.1)} className="mt-20 md:mt-24 grid grid-cols-2 gap-y-10 gap-x-6 border-t border-white/10 pt-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                <CountUp value={stat.value} />
              </dt>
              <dd className="mt-2 text-sm text-white/50">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};

const PhilosophySection = () => {
  return (
    <section className="relative w-full bg-[#020202] text-white px-6 pb-24 md:pb-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#ff8a5c]">
            How I Work
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.08]">
            Principles behind{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b]">
              every build
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-white/50">
            Three rules I hold every project to — mine or a client&apos;s.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {philosophy.map((item, index) => (
            <motion.article
              key={item.num}
              {...reveal(index * 0.1)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-[#bf4417]/40 hover:bg-white/[0.05]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-2 right-4 font-display text-[88px] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_rgba(191,68,23,0.35)] select-none transition-all duration-300 group-hover:[-webkit-text-stroke-color:rgba(191,68,23,0.7)]"
              >
                {item.num}
              </span>

              <h3 className="font-display text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-white/60">
                {item.text}
              </p>

              <span
                aria-hidden
                className="mt-6 block h-px w-10 bg-gradient-to-r from-[#bf4417] to-transparent transition-all duration-300 group-hover:w-full"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClosingSection = () => {
  return (
    <section className="relative w-full bg-[#020202] text-white px-6 py-24 md:py-32 overflow-hidden border-t border-white/[0.06]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] blur-[120px] opacity-20 pointer-events-none z-0" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div {...reveal()} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bf4417]/10 border border-[#bf4417]/30 text-[#bf4417] text-xs font-semibold uppercase tracking-wider mb-5">
          <Sparkles size={14} />
          Next Step
        </motion.div>

        <motion.h2
          {...reveal(0.08)}
          className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight"
        >
          Let&apos;s build something{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b]">
            great together
          </span>
        </motion.h2>

        <motion.p
          {...reveal(0.16)}
          className="mt-5 text-white/60 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed"
        >
          Have a project in mind, an idea to explore, or a team to join? I&apos;m
          always open to collaborations, freelance work, and interesting
          problems.
        </motion.p>

        <motion.div {...reveal(0.22)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#bf4417] hover:bg-[#c2410c] text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-[0_0_25px_rgba(191,68,23,0.35)]"
          >
            <Send size={15} />
            Contact Me
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] border border-white/15 hover:border-[#bf4417]/60 hover:text-white text-white/80 text-sm font-medium rounded-xl transition-all duration-200"
          >
            View Projects
          </Link>
        </motion.div>

        <motion.ul
          {...reveal(0.28)}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8"
        >
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-[#ff8a5c]"
              >
                {social.label}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export const About = () => {
  return (
    <main className="w-full bg-[#020202]">
      <SEO
        title="About Dhairya Shah – Full-Stack Developer Portfolio"
        description="Learn about Shah Dhairya's journey from first C program to building full-stack applications with React, PHP, Python and modern web technologies."
        path="/about"
        jsonLd={[breadcrumbJsonLd, profileJsonLd]}
      />

      <AboutHeader />
      <ProfileSection />
      <PhilosophySection />
      <JourneyTimeline />
      <ClosingSection />
    </main>
  );
};

export default About;
