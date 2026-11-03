import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion, animate, useInView } from "framer-motion";
import {
  ArrowRight,
  Compass,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import JourneyTimeline from "@/components/JourneyTimeline";
import PageHeader from "@/components/PageHeader";
import PageCTA from "@/components/shared/PageCTA";
import { SEO } from "@/components/SEO";
import BlurText from "@/components/reactbits/BlurText";
import ClickSpark from "@/components/reactbits/ClickSpark";
import DotGrid from "@/components/reactbits/DotGrid";
import GradientText from "@/components/reactbits/GradientText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import StarBorder from "@/components/reactbits/StarBorder";
import { SectionEyebrow } from "@/components/home/cards";
import { identity, stats, philosophy } from "@/data/profile";

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

const AboutHeader = () => (
  <PageHeader
    title={"BEHIND\nTHE CODE"}
    kicker="whoami"
    subtitle="The story, principles and path behind the work — not just what I build, but why I build it."
  />
);

const ProfileSection = () => {
  return (
    <section className="relative w-full bg-[#020202] text-white px-6 pt-20 pb-20 md:pt-28 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
      <DotGrid className="pointer-events-none absolute inset-0 opacity-30" dotSize={1.5} gap={30} radius={170} activeColor="#ff9a4d" />
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
            <motion.div {...reveal(0.05)}>
              <SectionEyebrow icon={Sparkles}>Who I Am</SectionEyebrow>
            </motion.div>

            <motion.h2
              {...reveal(0.12)}
              className="mt-6 font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.06]"
            >
              <BlurText text="Engineering with precision." className="block" />
              <span className="mt-1 block">
                Designing with{" "}
                <GradientText speed={7} glow={0.2}>
                  intent.
                </GradientText>
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
                  <li key={fact.label} className="flex flex-wrap items-center gap-x-4 gap-y-1.5 py-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/10 text-[#ff8a5c]">
                      <Icon size={16} />
                    </span>
                    <span className="w-auto shrink-0 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50 sm:w-36">
                      {fact.label}
                    </span>
                    <span className="basis-full text-sm text-white/80 sm:basis-auto sm:flex-1">
                      {fact.value}
                    </span>
                  </li>
                );
              })}
            </motion.ul>

            <motion.div {...reveal(0.38)} className="mt-9 flex flex-wrap items-center gap-3">
              <StarBorder
                as={Link}
                to="/contact"
                color="#ff9a4d"
                backgroundColor="#1a0d08"
                textColor="#ffffff"
                speed={4.5}
                radius={14}
              >
                Get in touch
                <ArrowRight size={15} />
              </StarBorder>
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
          <SectionEyebrow icon={Compass}>How I Work</SectionEyebrow>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.08]">
            <BlurText text="Principles behind" className="block" />
            <span className="mt-1 block">
              <GradientText speed={7} glow={0.2}>
                every build
              </GradientText>
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-white/50">
            Three rules I hold every project to — mine or a client&apos;s.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {philosophy.map((item, index) => (
            <motion.article key={item.num} {...reveal(index * 0.1)}>
              <SpotlightCard className="group relative h-full p-7 transition-all duration-300 hover:-translate-y-1">
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
              </SpotlightCard>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClosingSection = () => (
  <PageCTA
    eyebrow="NEXT STEP"
    title="Let's build something"
    accent="great together"
    description="Have a project in mind, an idea to explore, or a team to join? I'm always open to collaborations, freelance work, and interesting problems."
  />
);

export const About = () => {
  return (
    <ClickSpark color="#ff9a4d" count={10} size={14} radius={34} className="w-full overflow-x-clip bg-[#020202]">
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
    </ClickSpark>
  );
};

export default About;
