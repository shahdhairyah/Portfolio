import { forwardRef, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, ExternalLink, GitBranch, Rocket, Globe, Package, Code2, Lock } from "lucide-react";
import { SEO } from "@/components/SEO";
import { projects, projectCategories, isPrivateProject } from "@/data/projects";

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

GithubIcon.propTypes = { size: PropTypes.number };

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://shahdhairyah.in/" },
    { "@type": "ListItem", position: 2, name: "Projects", item: "https://shahdhairyah.in/projects" },
  ],
};

const EASE = [0.16, 1, 0.3, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const headerIcons = [
  { icon: GitBranch, pos: "top-[14%] left-[8%] md:left-[12%]", speed: "4.2s", size: 22 },
  { icon: Rocket, pos: "bottom-[24%] left-[10%] md:left-[16%]", speed: "5.1s", size: 20 },
  { icon: Globe, pos: "top-[18%] right-[8%] md:right-[13%]", speed: "3.9s", size: 22 },
  { icon: Package, pos: "bottom-[22%] right-[10%] md:right-[15%]", speed: "4.7s", size: 20 },
  { icon: Code2, pos: "top-[48%] left-[5%]", speed: "5.4s", size: 17 },
];

const ProjectsHeader = () => {
  return (
    <section className="relative w-full flex min-h-[320px] flex-col items-center justify-center overflow-hidden bg-[#020202] px-6 py-20 md:min-h-[420px]">
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(#bf4417_0%,transparent_55%)] opacity-20 blur-[100px] md:w-[1100px]" />

      {headerIcons.map((item, i) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
            className={`absolute ${item.pos} z-20 rounded-xl border border-[#bf4417]/25 bg-white/[0.04] p-3 text-[#bf4417]/70 backdrop-blur-md animate-bounce`}
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
        className="relative z-10 font-mono text-xs tracking-[0.08em] text-white/50 sm:text-sm"
      >
        <span className="text-emerald-400">➜</span>{" "}
        <span className="text-sky-400">~</span> git log{" "}
        <span className="text-white/30">--oneline --graph</span>
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="relative z-10 mt-5 select-none text-center font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(3rem,10vw,8rem)]"
      >
        <span className="block text-white">Case</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b]">
          Studies
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
        className="relative z-10 mt-6 max-w-lg text-center text-sm font-light leading-relaxed text-white/55 sm:text-base"
      >
        From problem to production — each project is a deep dive into the
        decisions, trade-offs, and engineering behind the build.
      </motion.p>
    </section>
  );
};

const FeaturedProject = ({ project }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative w-full max-w-6xl mx-auto px-6"
    >
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#bf4417]/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative grid gap-0 md:grid-cols-2">
          <div className="relative h-[40vh] md:h-[520px] overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: project.coverPosition || "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#020202]/40" />

            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                {project.status}
              </span>
              <span className="rounded-full border border-[#bf4417]/30 bg-[#bf4417]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#bf4417]">
                Featured
              </span>
            </div>
          </div>

          <div className="relative flex flex-col justify-center p-8 md:p-10">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#bf4417]">
              {project.category} · {project.year}
            </span>

            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {project.title}
            </h2>

            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-white/60">
              {project.tagline}
            </p>

            {project.stats && (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
                    <div className="font-display text-lg font-bold text-white">{stat.value}</div>
                    <div className="mt-0.5 text-[10px] text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono text-white/60">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#bf4417] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#c2410c] hover:shadow-[0_0_25px_rgba(191,68,23,0.35)]"
              >
                View Case Study
                <ArrowUpRight size={15} />
              </Link>
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-[#bf4417]/60 hover:text-white"
                >
                  <GithubIcon size={14} />
                  Source
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-white/45">
                  <Lock size={13} />
                  Private repo
                </span>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-[#bf4417]/60 hover:text-white"
                >
                  <ExternalLink size={14} />
                  Live
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

FeaturedProject.propTypes = {
  project: PropTypes.object.isRequired,
};

const ProjectCard = forwardRef(({ project, index }, ref) => {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-[#bf4417]/40 hover:shadow-[0_0_60px_rgba(191,68,23,0.1)]"
    >
      <div className="relative h-[340px] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: project.coverPosition || "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent" />

        <div className="absolute top-4 right-4 flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#020202]/70 text-white/60 backdrop-blur-md transition-all duration-200 hover:border-[#bf4417]/60 hover:text-white"
            >
              <GithubIcon size={14} />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#020202]/70 text-white/60 backdrop-blur-md transition-all duration-200 hover:border-[#bf4417]/60 hover:text-white"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={14} />
            </a>
          )}
          {isPrivateProject(project) && (
            <span
              className="flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-[#020202]/70 px-3 text-white/45 backdrop-blur-md"
              title="Source not public"
            >
              <Lock size={13} />
              <span className="text-[10px] font-medium uppercase tracking-wider">
                Private
              </span>
            </span>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#bf4417]">
            {project.category}
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold leading-snug text-white">
            {project.title}
          </h3>
          <p className="mt-2 max-w-md text-[13px] font-light leading-relaxed text-white/55 line-clamp-2">
            {project.tagline}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] px-6 py-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((s) => (
            <span key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-white/50">
              {s}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-white/30">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/60 transition-colors duration-200 hover:text-[#bf4417]"
        >
          Details
          <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
});

ProjectCard.displayName = "ProjectCard";

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const FilterPills = ({ categories, active, counts, onChange }) => (
  <motion.div
    layout
    className="mt-8 flex flex-wrap items-center gap-2.5"
  >
    {categories.map((cat) => {
      const isActive = active === cat;
      return (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`relative rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 cursor-pointer ${
            isActive ? "text-white" : "text-white/55 hover:text-white/90"
          }`}
        >
          {isActive && (
            <motion.span
              layoutId="project-filter-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#bf4417] to-[#991b1b] shadow-[0_0_18px_rgba(191,68,23,0.4)]"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          {!isActive && (
            <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03]" />
          )}
          <span className="relative flex items-center gap-2">
            {cat}
            <span className={`font-mono text-[10px] ${isActive ? "text-white/70" : "text-white/35"}`}>
              {counts[cat] ?? 0}
            </span>
          </span>
        </button>
      );
    })}
  </motion.div>
);

FilterPills.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  active: PropTypes.string.isRequired,
  counts: PropTypes.objectOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};

export const Projects = () => {
  const [activeCat, setActiveCat] = useState("All");
  const featured = projects.find((p) => p.featured) || projects[0];

  const rest = useMemo(
    () => projects.filter((p) => p.id !== featured.id),
    [featured.id]
  );

  const counts = useMemo(() => {
    const map = {};
    projectCategories.forEach((cat) => {
      map[cat] =
        cat === "All"
          ? rest.length
          : rest.filter((p) => p.category === cat).length;
    });
    return map;
  }, [rest]);

  const filtered =
    activeCat === "All" ? rest : rest.filter((p) => p.category === activeCat);

  return (
    <main className="relative w-full bg-[#020202]">
      <SEO
        title="Projects by Shah Dhairya – Full-Stack Case Studies"
        description="Explore full-stack projects built by Shah Dhairya — web apps, AI/IoT integrations, and digital products crafted with React, PHP, Python and Node.js."
        path="/projects"
        jsonLd={breadcrumbJsonLd}
      />

      <ProjectsHeader />

      <div className="relative w-full overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[600px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[140px]" />

        <div className="relative z-10 space-y-16 md:space-y-24">
          <FeaturedProject project={featured} />

          <section className="mx-auto max-w-6xl px-6">
            <motion.div {...reveal()} className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#ff8a5c]">
                All Projects
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                More builds, same{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b]">
                  standard
                </span>
              </h2>
              <p className="mt-3 text-sm font-light text-white/60">
                {rest.length} more {rest.length === 1 ? "project" : "projects"} — each built with the same attention to
                detail, performance, and clean architecture.
              </p>
            </motion.div>

            <FilterPills
              categories={projectCategories}
              active={activeCat}
              counts={counts}
              onChange={setActiveCat}
            />

            <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {filtered.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-10 text-center text-sm font-mono text-white/45"
                >
                  No projects in this category yet.
                </motion.p>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Projects;
