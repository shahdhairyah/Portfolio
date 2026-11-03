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
  ArrowRight,
  Command,
  MapPin,
  CircleDot,
} from "lucide-react";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiMysql,
  SiTailwindcss,
  SiVite,
  SiGit,
  SiGithub,
  SiDocker,
} from "react-icons/si";
import { SEO } from "@/components/SEO";
import { identity, socials, stats, philosophy } from "@/data/profile";
import { projects } from "@/data/projects";
import { EASE } from "@/components/home/ease";
import { GithubIcon, LinkedinIcon } from "@/components/home/effects";
import { TerminalCard, FeaturedProjectCard } from "@/components/home/cards";
import Aurora from "@/components/reactbits/Aurora";
import BlurText from "@/components/reactbits/BlurText";
import DecryptedText from "@/components/reactbits/DecryptedText";
import ShinyText from "@/components/reactbits/ShinyText";
import GradientText from "@/components/reactbits/GradientText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import Magnet from "@/components/reactbits/Magnet";
import StarBorder from "@/components/reactbits/StarBorder";
import CountUp from "@/components/reactbits/CountUp";
import DotGrid from "@/components/reactbits/DotGrid";
import ClickSpark from "@/components/reactbits/ClickSpark";

const TICKER = [
  "React", "PHP", "Python", "Node.js", "MySQL",
  "Tailwind CSS", "REST APIs", "Git", "GitHub", "Vite",
];

const STACK = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Python", icon: SiPython, color: "#FFD43B" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#E6EDF3" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

const floatingIcons = [
  { icon: Code2, pos: "top-[18%] left-[2%]", anim: "4.2s", size: 20 },
  { icon: Globe, pos: "bottom-[30%] left-[2%]", anim: "5.1s", size: 18 },
  { icon: Rocket, pos: "top-[22%] right-[2%]", anim: "3.9s", size: 20 },
  { icon: Sparkles, pos: "bottom-[34%] right-[2%]", anim: "4.7s", size: 18 },
];

const statNumber = (value) => parseInt(String(value), 10) || 0;
const statSuffix = (value) => String(value).replace(/^\d+/, "");

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
    <ClickSpark color="#ff9a4d" count={12} size={16} radius={36} className="w-full overflow-hidden bg-[#020202]">
      <SEO
        title="Shah Dhairya – Full-Stack Developer & Digital Architect"
        description="Portfolio of Shah Dhairya, a full-stack developer building products with React, Node.js, Python and PHP."
        path="/"
        jsonLd={personJsonLd}
      />

      {/* HERO */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
        <Aurora
          className="absolute inset-0"
          colorStops={["#bf4417", "#ea580c", "#7f1d1d", "#ff9a4d"]}
          speed={0.55}
          amplitude={1.15}
          opacity={0.85}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#020202_78%)]" />
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:58px_58px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_78%)]" />

        {floatingIcons.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
              className={`absolute hidden xl:block ${item.pos} z-20 rounded-xl border border-[#bf4417]/25 bg-white/[0.04] p-3 text-[#ff9a4d]/80 backdrop-blur-md animate-bounce`}
              style={{ animationDuration: item.anim }}
            >
              <Icon size={item.size} />
            </motion.div>
          );
        })}

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
          <div className="grid items-center gap-14 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="text-center xl:text-left">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <ShinyText
                  text="Available for freelance & collaborations"
                  color="#8f8f8f"
                  shineColor="#ffffff"
                  speed={4}
                  className="text-[10px] font-medium uppercase tracking-[0.2em]"
                />
              </div>

              <h1 className="mt-8 select-none font-display font-extrabold leading-[0.82] tracking-[-0.05em]">
                <BlurText
                  as="span"
                  text="Shah"
                  trigger="load"
                  delay={110}
                  className="block text-[clamp(4rem,15vw,9.5rem)] text-white"
                />
                <GradientText
                  className="mt-1 block text-[clamp(2.5rem,13.5vw,8.7rem)] leading-[0.85] xl:text-[clamp(3.3rem,8vw,6.5rem)]"
                  colors={["#bf4417", "#ea580c", "#ffb26b", "#ff9a4d", "#bf4417"]}
                  speed={7}
                  glow={0.45}
                >
                  Dhairya
                </GradientText>
              </h1>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-white/45 xl:justify-start">
                <span className="h-px w-9 bg-gradient-to-r from-[#bf4417] to-transparent" />
                <DecryptedText
                  text="Full-Stack Developer"
                  animateOn="view"
                  className="font-medium text-white/80"
                />
                <span className="text-[#bf4417]">/</span>
                <span>Digital Architect</span>
              </div>

              <p className="mx-auto mt-7 max-w-lg text-sm font-light leading-relaxed text-white/60 sm:text-base xl:mx-0">
                I build fast, reliable web products where clean engineering meets
                considered design — from the first pixel to the final deployment.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4 xl:justify-start">
                <Magnet className="inline-block" maxOffset={10} strength={0.2}>
                  <StarBorder
                    as={Link}
                    to="/projects"
                    color="#ff9a4d"
                    backgroundColor="#1a0d08"
                    textColor="#ffffff"
                    speed={4.5}
                    radius={14}
                  >
                    <ArrowUpRight size={16} />
                    View Work
                  </StarBorder>
                </Magnet>
                <Magnet className="inline-block" maxOffset={8} strength={0.16}>
                  <Link
                    to="/resume"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-white/60 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:text-white"
                  >
                    <FileText size={15} />
                    Resume
                  </Link>
                </Magnet>
              </div>

              <div className="mt-9 flex items-center justify-center gap-4 xl:justify-start">
                <Magnet className="inline-block" maxOffset={8} strength={0.35}>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition-colors hover:border-[#bf4417]/50 hover:text-white"
                  >
                    <GithubIcon size={17} />
                  </a>
                </Magnet>
                <Magnet className="inline-block" maxOffset={8} strength={0.35}>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition-colors hover:border-[#bf4417]/50 hover:text-white"
                  >
                    <LinkedinIcon size={17} />
                  </a>
                </Magnet>
                <span className="h-px w-8 bg-white/10" />
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/40">
                  <MapPin size={11} className="text-[#bf4417]" />
                  Gujarat, India
                </span>
              </div>
            </div>

            {/* Portrait card */}
            <div className="relative mx-auto w-full max-w-[380px]">
              <div className="pointer-events-none absolute -inset-12 rounded-full bg-[#bf4417]/20 blur-[90px]" />
              <SpotlightCard
                className="relative rounded-[2rem] border-white/10 bg-[#080808]/80 p-2 backdrop-blur-xl"
                color="rgba(234, 88, 12, 0.32)"
                size={360}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                  <img
                    src="/passport.png"
                    alt="Shah Dhairya"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/10 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/75 backdrop-blur-md">
                    <CircleDot size={10} className="text-emerald-400" />
                    Open to work
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#ff9a4d]">
                      Digital Architect
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-white">
                      Shah Dhairya
                    </h2>
                    <p className="mt-1 text-xs font-light text-white/45">
                      {identity.education}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5 p-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-1.5 py-3 text-center"
                    >
                      <div className="font-display text-lg font-extrabold text-white">
                        <CountUp to={statNumber(stat.value)} suffix={statSuffix(stat.value)} />
                      </div>
                      <div className="mt-0.5 text-[7px] uppercase tracking-[0.12em] text-white/40">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>

              <Magnet
                className="absolute -right-4 top-20 hidden sm:block"
                maxOffset={12}
                strength={0.3}
              >
                <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-3 pr-4 shadow-2xl backdrop-blur-xl">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#bf4417]/15 text-[#ff9a4d]">
                    <Code2 size={15} />
                  </span>
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.16em] text-white/35">Focus</p>
                    <p className="text-xs font-semibold text-white">Full-Stack</p>
                  </div>
                </div>
              </Magnet>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 xl:flex"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/35">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-white/25 to-transparent"
          />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/[0.05] bg-black/30 py-3 backdrop-blur-sm [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee-left gap-10">
            {[...TICKER, ...TICKER].map((word, i) => (
              <span
                key={i}
                className="flex items-center gap-10 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em]"
              >
                <span className="text-white/20">{word}</span>
                <span className="text-[#bf4417]/40">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO — BENTO */}
      <section id="about" className="relative w-full px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[600px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#bf4417]/30 bg-[#bf4417]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff8a5c]">
            <Sparkles size={12} />
            The Approach
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tighter text-white sm:text-5xl lg:text-[52px]">
              <BlurText text="Designing and engineering" className="block" delay={55} />
              <GradientText className="mt-1 block" speed={9}>
                digital experiences.
              </GradientText>
            </h2>
            <p className="max-w-md text-sm font-light leading-relaxed text-white/55 sm:text-base lg:justify-self-end">
              I build production-ready digital products for startups, academic
              institutions, and businesses — turning complex requirements into
              reliable, scalable web applications.
            </p>
          </div>

          <div className="mt-14 grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="md:col-span-7"
            >
              <SpotlightCard className="h-full p-8 md:p-10">
                <span className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                  <Command size={13} className="text-[#bf4417]" />
                  Full lifecycle
                </span>
                <p className="text-sm font-light leading-relaxed text-white/55 sm:text-base">
                  From custom applications and management portals to modernizing
                  legacy systems, I work across the full development lifecycle. My
                  expertise includes{" "}
                  <strong className="font-medium text-white/80">
                    React, PHP, Python, MySQL, Node.js, and Tailwind CSS
                  </strong>{" "}
                  — building software designed not just to work, but to scale.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-6 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="font-display text-2xl font-extrabold">
                        <GradientText speed={10}>
                          <CountUp to={statNumber(stat.value)} suffix={statSuffix(stat.value)} />
                        </GradientText>
                      </div>
                      <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/40">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="md:col-span-5"
            >
              <TerminalCard />
            </motion.div>

            {philosophy.map((item, index) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
                className="md:col-span-4"
              >
                <SpotlightCard
                  className="h-full p-8"
                  color="rgba(234, 88, 12, 0.22)"
                  size={260}
                >
                  <span className="font-mono text-4xl font-extrabold text-transparent [-webkit-text-stroke:1px_rgba(191,68,23,0.55)]">
                    {item.num}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-extrabold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-white/55">
                    {item.text}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section id="work" className="relative w-full px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-[400px] w-[600px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-[0.08] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#bf4417]/30 bg-[#bf4417]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff8a5c]">
                <Briefcase size={12} />
                Selected Work
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                <BlurText text="Work that ships." className="block" />
              </h2>
            </div>
            <Link to="/projects" className="gold-link">
              View all projects
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <FeaturedProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="relative w-full overflow-hidden px-6 py-24 md:py-28">
        <DotGrid className="opacity-50" dotSize={1.6} gap={30} radius={170} activeColor="#ff9a4d" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020202_72%)]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="text-center">
            <ShinyText
              text="TECH STACK"
              color="#8b8b8b"
              shineColor="#ff9a4d"
              speed={5}
              className="text-[10px] font-semibold uppercase tracking-[0.26em]"
            />
            <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
              <BlurText text="Tools I build with" className="inline-block" />
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-white/45">
              A focused stack, chosen for speed, clarity, and long-term
              maintainability.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {STACK.map((tech) => {
              const Icon = tech.icon;
              return (
                <Magnet key={tech.name} maxOffset={10} strength={0.22} padding={60}>
                  <div className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-3 py-5 backdrop-blur-sm transition-all duration-300 hover:border-[#bf4417]/35 hover:bg-white/[0.04]">
                    <Icon
                      size={26}
                      style={{ color: tech.color }}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45 transition-colors group-hover:text-white/75">
                      {tech.name}
                    </span>
                  </div>
                </Magnet>
              );
            })}
          </div>

          <div className="mt-14 overflow-hidden border-y border-white/[0.04] py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee-left gap-8">
              {[...TICKER, ...TICKER, ...TICKER].map((word, i) => (
                <span
                  key={i}
                  className="flex items-center gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-wider"
                >
                  <span className="text-white/10 transition-colors hover:text-[#bf4417]">{word}</span>
                  <span className="text-[#bf4417]/20">•</span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-2 overflow-hidden border-b border-white/[0.04] py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee-right gap-8">
              {[...TICKER, ...TICKER, ...TICKER].map((word, i) => (
                <span
                  key={i}
                  className="flex items-center gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-wider"
                >
                  <span className="text-white/10 transition-colors hover:text-[#bf4417]">{word}</span>
                  <span className="text-[#bf4417]/20">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative w-full px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-[0.12] blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative z-10 mx-auto max-w-4xl"
        >
          <SpotlightCard
            className="rounded-[2rem] border-white/10 bg-[#070707]/85 px-6 py-14 text-center backdrop-blur-xl sm:px-12 md:py-20"
            color="rgba(234, 88, 12, 0.24)"
            size={520}
          >
            <ShinyText
              text="GET IN TOUCH"
              color="#8b8b8b"
              shineColor="#ff9a4d"
              speed={4}
              className="text-[10px] font-semibold uppercase tracking-[0.26em]"
            />
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              <BlurText text="Let's build something" className="block" />
              <GradientText className="mt-1 block" speed={7} glow={0.3}>
                remarkable.
              </GradientText>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm font-light leading-relaxed text-white/50">
              Have a project in mind or want to collaborate? I&apos;m always open
              to discussing new opportunities and creative ideas.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnet className="inline-block" maxOffset={10} strength={0.22}>
                <StarBorder
                  as="a"
                  href={`mailto:${identity.email}`}
                  color="#ff9a4d"
                  backgroundColor="#1a0d08"
                  textColor="#ffffff"
                  speed={4}
                  radius={14}
                >
                  <Send size={15} />
                  Contact Me
                </StarBorder>
              </Magnet>
              <Magnet className="inline-block" maxOffset={8} strength={0.16}>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-white/55 transition-all duration-300 hover:border-white/25 hover:text-white"
                >
                  <Code2 size={15} className="text-[#bf4417]" />
                  View Projects
                  <ArrowUpRight size={14} />
                </Link>
              </Magnet>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-white/[0.06] pt-8 text-[10px] uppercase tracking-[0.16em] text-white/35">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={11} className="text-[#bf4417]" />
                Gujarat, India
              </span>
              <span className="h-3 w-px bg-white/10" />
              <a
                href={`mailto:${identity.email}`}
                className="transition-colors hover:text-white/70"
              >
                {identity.email}
              </a>
            </div>
          </SpotlightCard>
        </motion.div>
      </section>
    </ClickSpark>
  );
};

export { Home };
export default Home;
