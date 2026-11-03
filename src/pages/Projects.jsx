import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Layers } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PageCTA from "@/components/shared/PageCTA";
import ClickSpark from "@/components/reactbits/ClickSpark";
import DotGrid from "@/components/reactbits/DotGrid";
import BlurText from "@/components/reactbits/BlurText";
import GradientText from "@/components/reactbits/GradientText";
import { FeaturedProjectCard, SectionEyebrow } from "@/components/home/cards";
import { EASE } from "@/components/home/ease";
import { SEO } from "@/components/SEO";
import { projects, projectCategories } from "@/data/projects";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://shahdhairyah.in/" },
    { "@type": "ListItem", position: 2, name: "Projects", item: "https://shahdhairyah.in/projects" },
  ],
};

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const ProjectsHeader = () => (
  <PageHeader
    title={"CASE\nSTUDIES"}
    kicker="git log --oneline --graph"
    subtitle="From problem to production — each project is a deep dive into the decisions, trade-offs, and engineering behind the build."
  />
);

const FilterPills = ({ categories, active, counts, onChange }) => (
  <motion.div layout className="mt-8 flex flex-wrap items-center gap-2.5">
    {categories.map((cat) => {
      const isActive = active === cat;
      return (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`relative cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 ${
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
    <ClickSpark color="#ff9a4d" count={10} size={14} radius={34} className="relative w-full overflow-hidden bg-[#020202]">
      <SEO
        title="Projects by Shah Dhairya – Full-Stack Case Studies"
        description="Explore full-stack projects built by Shah Dhairya — web apps, AI/IoT integrations, and digital products crafted with React, PHP, Python and Node.js."
        path="/projects"
        jsonLd={breadcrumbJsonLd}
      />

      <ProjectsHeader />

      <div className="relative w-full overflow-hidden py-16 md:py-24">
        <DotGrid className="opacity-20" dotSize={1.5} gap={32} radius={160} activeColor="#ff9a4d" />
        <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[600px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[140px]" />

        <div className="relative z-10 space-y-16 md:space-y-24">
          <section className="mx-auto w-full max-w-6xl px-6">
            <motion.div {...reveal()} className="mb-8">
              <SectionEyebrow icon={Layers}>Featured Build</SectionEyebrow>
            </motion.div>
            <FeaturedProjectCard project={featured} />
          </section>

          <section className="mx-auto max-w-6xl px-6">
            <motion.div {...reveal()} className="max-w-2xl">
              <SectionEyebrow icon={Layers}>All Projects</SectionEyebrow>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                <BlurText text="More builds, same" className="block" />
                <GradientText className="mt-1 block" speed={7} glow={0.2}>
                  standard
                </GradientText>
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

            <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <FeaturedProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {filtered.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-10 text-center font-mono text-sm text-white/45"
                >
                  No projects in this category yet.
                </motion.p>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>

      <PageCTA
        eyebrow="YOUR PROJECT NEXT"
        title="Have an idea worth"
        accent="building?"
        description="Tell me the problem, the constraints, and the goal — I'll help shape it into a production-ready product."
        secondaryLabel="View Skills"
        secondaryTo="/skills"
      />
    </ClickSpark>
  );
};

export default Projects;
