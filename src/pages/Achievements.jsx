import { useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Trophy,
  Award,
  Medal,
  Flame,
  Users,
  Quote,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Images,
  LayoutGrid,
  GitCommitVertical,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import PageCTA from "@/components/shared/PageCTA";
import ClickSpark from "@/components/reactbits/ClickSpark";
import CountUp from "@/components/reactbits/CountUp";
import DotGrid from "@/components/reactbits/DotGrid";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { SectionEyebrow } from "@/components/home/cards";
import { EASE } from "@/components/home/ease";
import { SEO } from "@/components/SEO";
import { hackathons, achievementCategories } from "@/data/achievements";

/* ═══════════════════════════════════════════
   STAT HELPERS & BREADCRUMBS
   ═══════════════════════════════════════════ */
const statsData = [
  {
    icon: Flame,
    number: "25+",
    label: "Hackathon Participant",
    subtext: "Across 3+ years of intense competitive building",
  },
  {
    icon: Trophy,
    number: "2",
    label: "State Champion Titles",
    subtext: "Gujarat Gaurav Award & BBIT Creato Best Project",
  },
  {
    icon: Award,
    number: "17+",
    label: "Final Rounds Selected",
    subtext: "Shortlisted in top competitive cohorts statewide",
  },
  {
    icon: Users,
    number: "10400+",
    displaySuffix: "+",
    label: "Participants Faced",
    subtext: "2,062+ registered teams in state arenas",
  },
];

const statNumber = (value) => parseInt(String(value), 10) || 0;
const statSuffix = (value) => String(value).replace(/^\d+/, "");

const StatCountUp = ({ value, suffixOverride }) => (
  <CountUp
    to={statNumber(value)}
    suffix={suffixOverride !== undefined ? suffixOverride : statSuffix(value)}
  />
);

StatCountUp.propTypes = {
  value: PropTypes.string.isRequired,
  suffixOverride: PropTypes.string,
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://shahdhairyah.in/" },
    { "@type": "ListItem", position: 2, name: "Achievements", item: "https://shahdhairyah.in/achievements" },
  ],
};

/* ═══════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════ */
const AchievementsHeader = () => (
  <PageHeader
    title={"HALL OF\nFAME"}
    kicker={`grep -r "wins" ./achievements`}
    subtitle="Milestones, hackathon records, and recognition earned along the way. Every number tells a story of building under pressure."
  />
);

/* ═══════════════════════════════════════════
   IMAGE WITH FALLBACK
   ═══════════════════════════════════════════ */
const ImageWithFallback = ({ src, alt, className, rank, org }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#180e0a] via-[#0d0d0d] to-[#040404] p-6 text-center ${className}`}
      >
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[radial-gradient(#bf4417,transparent)] opacity-20 blur-2xl" />
        <Trophy size={36} className="text-[#ff9a4d]/40 mb-2" />
        <span className="font-display text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          {rank || "WINNER"}
        </span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
          {org || "Hackathon Arena"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      className={className}
    />
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  rank: PropTypes.string,
  org: PropTypes.string,
};

/* ═══════════════════════════════════════════
   FILTER PILLS COMPONENT
   ═══════════════════════════════════════════ */
const FilterPills = ({ categories, active, counts, onChange }) => (
  <div className="flex flex-wrap items-center gap-2">
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
              layoutId="achievements-filter-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#bf4417] to-[#991b1b] shadow-[0_0_18px_rgba(191,68,23,0.4)]"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          {!isActive && (
            <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03]" />
          )}
          <span className="relative flex items-center gap-2">
            {cat}
            <span
              className={`font-mono text-[10px] ${
                isActive ? "text-white/70" : "text-white/35"
              }`}
            >
              {counts[cat] ?? 0}
            </span>
          </span>
        </button>
      );
    })}
  </div>
);

FilterPills.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  active: PropTypes.string.isRequired,
  counts: PropTypes.objectOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};

/* ═══════════════════════════════════════════
   LIGHTBOX MODAL
   ═══════════════════════════════════════════ */
const QuickLightboxModal = ({ hack, initialIndex = 0, onClose }) => {
  const [index, setIndex] = useState(initialIndex);
  const gallery = hack?.gallery || [];

  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + gallery.length) % gallery.length),
    [gallery.length]
  );
  const goNext = useCallback(
    () => setIndex((i) => (i + 1) % gallery.length),
    [gallery.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev]);

  if (!hack || gallery.length === 0) return null;

  const currentCaption = hack.captions?.[index] || `${hack.title} — Photo ${index + 1}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl md:p-8"
        onClick={onClose}
      >
        <div
          className="relative flex max-h-[92vh] w-full max-w-5xl flex-col items-center overflow-hidden rounded-3xl border border-white/15 bg-[#0a0a0a] shadow-[0_0_60px_rgba(0,0,0,0.8)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex w-full items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#bf4417]/20 border border-[#bf4417]/40 text-[#ff9a4d]">
                <Trophy size={16} />
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                  {hack.title}
                </h4>
                <p className="font-mono text-[10px] text-white/50">
                  {hack.org} · {hack.year}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/50">
                {index + 1} / {gallery.length}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Main Photo Area */}
          <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden bg-black/60 p-4 sm:p-6 min-h-[300px] max-h-[64vh]">
            <img
              key={gallery[index]}
              src={gallery[index]}
              alt={currentCaption}
              className="max-h-[58vh] max-w-full rounded-xl object-contain shadow-2xl transition-all duration-300"
            />

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-black/60 text-white/80 hover:bg-[#bf4417] hover:text-white transition-all shadow-lg backdrop-blur-md"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-black/60 text-white/80 hover:bg-[#bf4417] hover:text-white transition-all shadow-lg backdrop-blur-md"
                  aria-label="Next photo"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Caption & Actions Footer */}
          <div className="flex w-full flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 bg-[#070707] px-6 py-4">
            <p className="text-xs text-white/70 font-light italic text-center sm:text-left line-clamp-2">
              &ldquo;{currentCaption}&rdquo;
            </p>

            <div className="flex items-center gap-3 shrink-0">
              {/* Thumbnail strip */}
              <div className="hidden md:flex items-center gap-1.5 overflow-x-auto max-w-[220px]">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-7 w-9 rounded overflow-hidden border transition-all ${
                      i === index
                        ? "border-[#ff9a4d] ring-2 ring-[#bf4417]/50 scale-105"
                        : "border-white/15 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>

              <Link
                to={`/achievements/${hack.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#bf4417] to-[#991b1b] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_15px_rgba(191,68,23,0.3)] hover:from-[#ea580c] hover:to-[#7f1d1d] transition-all"
              >
                Full Case Study
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

QuickLightboxModal.propTypes = {
  hack: PropTypes.object,
  initialIndex: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

/* ═══════════════════════════════════════════
   CROWNING MILESTONE (FEATURED HERO CARD)
   ═══════════════════════════════════════════ */
const FeaturedMilestoneCard = ({ hack, onOpenGallery }) => {
  if (!hack) return null;

  const coverImage = hack.image || hack.gallery?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: EASE }}
      className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.05] via-[#090909] to-[#040404] p-1 shadow-[0_0_50px_rgba(191,68,23,0.12)] hover:border-[#bf4417]/60 transition-all duration-500"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#bf4417] via-amber-400 to-[#991b1b]" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(#bf4417,transparent)] blur-[100px] opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 md:p-10">
        {/* Left Column: Visual Showcase */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-xl">
            <ImageWithFallback
              src={coverImage}
              alt={hack.title}
              rank={hack.rank}
              org={hack.org}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/30 to-transparent" />

            {/* Overlaid Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                <Star size={11} fill="currentColor" />
                Crowning Milestone
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-[10px] font-mono font-medium backdrop-blur-md">
                {hack.year}
              </span>
            </div>

            {/* Gallery Peek Action */}
            {hack.gallery && hack.gallery.length > 0 && (
              <button
                type="button"
                onClick={() => onOpenGallery(hack, 0)}
                className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/70 border border-white/15 text-white/90 text-xs font-mono backdrop-blur-md hover:bg-[#bf4417] hover:text-white transition-all shadow-lg"
              >
                <Images size={13} />
                <span>{hack.gallery.length} Photos</span>
              </button>
            )}

            <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#bf4417]/30 border border-[#bf4417]/50 text-[#ff9a4d] text-xs font-bold font-mono backdrop-blur-md">
              <Trophy size={13} />
              {hack.rank}
            </div>
          </div>

          {/* Quick Quote / Mentor acknowledgment teaser */}
          <div className="mt-4 hidden lg:flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-white/60">
            <ShieldCheck size={16} className="text-[#ff9a4d] shrink-0" />
            <span className="italic">
              Official recognized entry validated by state judging panels & organizers.
            </span>
          </div>
        </div>

        {/* Right Column: Narrative & Impact */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block px-3 py-1 rounded-lg bg-[#bf4417]/15 border border-[#bf4417]/30 text-xs font-bold uppercase tracking-wider text-[#ff9a4d]">
                {hack.org}
              </span>
              {hack.role && (
                <span className="text-[11px] font-mono text-white/50">
                  Role: {hack.role}
                </span>
              )}
            </div>

            <h3 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug group-hover:text-[#ff9a4d] transition-colors duration-300">
              {hack.title}
            </h3>

            <p className="mt-3 text-sm sm:text-base text-white/65 leading-relaxed font-light">
              {hack.text}
            </p>

            {/* Impact Metric Cards */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {hack.stats.map((st) => (
                <div
                  key={st.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center transition-all hover:border-[#bf4417]/40"
                >
                  <div className="font-display text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a4d] to-amber-300">
                    {st.value}
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-wider text-white/50 truncate">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Key takeaway bullets */}
            {hack.details && hack.details.length > 0 && (
              <div className="mt-6 space-y-2">
                {hack.details.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-white/70">
                    <CheckCircle2 size={14} className="mt-0.5 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
            <Link
              to={`/achievements/${hack.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#bf4417] to-[#991b1b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(191,68,23,0.35)] hover:from-[#ea580c] hover:to-[#7f1d1d] hover:shadow-[0_0_35px_rgba(191,68,23,0.5)] transition-all duration-300"
            >
              Explore Full Case Study
              <ArrowUpRight size={15} />
            </Link>

            {hack.gallery && hack.gallery.length > 0 && (
              <button
                type="button"
                onClick={() => onOpenGallery(hack, 0)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-xs font-medium text-white/70 hover:border-white/30 hover:text-white transition-all duration-300"
              >
                <Images size={14} />
                Quick Gallery Peek ({hack.gallery.length})
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

FeaturedMilestoneCard.propTypes = {
  hack: PropTypes.object,
  onOpenGallery: PropTypes.func.isRequired,
};

/* ═══════════════════════════════════════════
   BENTO GRID CARD
   ═══════════════════════════════════════════ */
const AchievementCard = ({ hack, index, onOpenGallery }) => {
  const Icon = hack.icon === Medal ? Medal : hack.icon === Award ? Award : Trophy;
  const coverImage = hack.image || hack.gallery?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] hover:border-[#bf4417]/50 hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#bf4417] via-amber-500 to-[#991b1b]" />
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(#bf4417,transparent)] blur-[70px] opacity-[0.08] group-hover:opacity-[0.22] transition-opacity" />

      {/* Rank watermark background */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute bottom-1 right-5 font-display font-extrabold leading-none text-[5.5rem] md:text-[6.5rem] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)]"
      >
        {hack.rank}
      </span>

      <div>
        {/* Card Visual Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-black/40">
          <ImageWithFallback
            src={coverImage}
            alt={hack.title}
            rank={hack.rank}
            org={hack.org}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/30 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/70 border border-white/15 text-[10px] font-bold uppercase tracking-wider text-[#ff9a4d] backdrop-blur-md">
              {hack.category || "Hackathon"}
            </span>
          </div>

          <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-400/15 border border-amber-400/35 text-amber-300 text-xs font-bold font-mono backdrop-blur-md">
              <Trophy size={12} />
              {hack.rank}
            </span>
          </div>

          {/* Photo count indicator */}
          {hack.gallery && hack.gallery.length > 0 && (
            <button
              type="button"
              onClick={() => onOpenGallery(hack, 0)}
              className="absolute bottom-3 left-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 border border-white/15 text-white/80 text-[11px] font-mono backdrop-blur-md hover:bg-[#bf4417] hover:text-white transition-colors"
            >
              <Images size={12} />
              {hack.gallery.length} Photos
            </button>
          )}

          <div className="absolute bottom-3 right-3.5 px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-white/60 text-[10px] font-mono backdrop-blur-md">
            {hack.year}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 md:p-7">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#bf4417]/25 to-[#991b1b]/10 border border-[#bf4417]/35 text-[#ff9a4d] shadow-[0_0_15px_rgba(191,68,23,0.2)] group-hover:scale-105 transition-transform">
              <Icon size={20} />
            </div>
            <div>
              <span className="inline-block text-[11px] font-bold text-[#ff9a4d]">
                {hack.org}
              </span>
              <span className="block text-[10px] font-mono text-white/45">
                {hack.role || "Competitor & Builder"}
              </span>
            </div>
          </div>

          <h3 className="relative mt-4 font-display text-xl md:text-2xl font-bold text-white leading-snug group-hover:text-[#ff9a4d] transition-colors duration-300">
            {hack.title}
          </h3>

          <p className="relative mt-3 text-xs md:text-sm text-white/60 leading-relaxed font-light line-clamp-3">
            {hack.text}
          </p>

          {/* 3-Stat Grid */}
          <div className="relative mt-6 grid grid-cols-3 gap-2">
            {hack.stats.map((stat) => (
              <div
                key={stat.label}
                className="px-2 py-3 rounded-xl bg-white/[0.02] border border-white/5 border-l-2 border-l-[#bf4417] text-center"
              >
                <div className="font-display text-base md:text-lg font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-[8.5px] uppercase tracking-wider text-white/50 truncate">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Key bullet points */}
          {hack.details && hack.details.length > 0 && (
            <div className="relative mt-5 space-y-1.5 border-t border-white/5 pt-4">
              {hack.details.slice(0, 2).map((det, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-white/65">
                  <CheckCircle2 size={12} className="mt-0.5 text-[#ff9a4d] shrink-0" />
                  <span className="line-clamp-1">{det}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="relative p-6 pt-0 flex items-center justify-between gap-3">
        <Link
          to={`/achievements/${hack.slug}`}
          className="group/more inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#bf4417]/40 bg-[#bf4417]/10 text-[#ff9a4d] text-xs font-semibold uppercase tracking-wider hover:bg-[#bf4417] hover:text-white transition-all duration-300"
        >
          Deep Dive Story
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover/more:translate-x-0.5 group-hover/more:-translate-y-0.5"
          />
        </Link>

        {hack.gallery && hack.gallery.length > 0 && (
          <button
            type="button"
            onClick={() => onOpenGallery(hack, 0)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-white/50 hover:text-white transition-colors"
          >
            <Images size={13} />
            Gallery
          </button>
        )}
      </div>
    </motion.div>
  );
};

AchievementCard.propTypes = {
  hack: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onOpenGallery: PropTypes.func.isRequired,
};

/* ═══════════════════════════════════════════
   CHRONOLOGICAL TIMELINE VIEW
   ═══════════════════════════════════════════ */
const TimelineNode = ({ hack, index, isLast, onOpenGallery }) => {
  const Icon = hack.icon;
  const coverImage = hack.image || hack.gallery?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: EASE }}
      className="relative flex items-start gap-5 md:gap-8 pb-12"
    >
      {/* Central Connector Spine */}
      {!isLast && (
        <div className="absolute left-[19px] md:left-[23px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-[#bf4417] via-amber-500/50 to-white/10" />
      )}

      {/* Luminous Node Emblem */}
      <div className="relative z-10 flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-2xl border border-[#bf4417]/40 bg-gradient-to-br from-[#bf4417]/30 to-[#991b1b]/20 text-[#ff9a4d] shadow-[0_0_20px_rgba(191,68,23,0.3)]">
        <Icon size={20} />
      </div>

      {/* Timeline Card */}
      <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 hover:border-[#bf4417]/50 transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#ff9a4d]">
              {hack.year}
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
              {hack.org}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold font-mono">
            <Trophy size={11} />
            {hack.rank}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-8">
            <h4 className="font-display text-xl md:text-2xl font-bold text-white">
              {hack.title}
            </h4>
            <p className="mt-2 text-xs md:text-sm text-white/60 leading-relaxed font-light">
              {hack.text}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {hack.stats.map((st) => (
                <span
                  key={st.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-white/70"
                >
                  <strong className="text-[#ff9a4d]">{st.value}</strong>
                  <span className="text-white/40">{st.label}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between gap-4">
            {coverImage && (
              <div className="relative aspect-[16/10] w-full md:w-44 overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <ImageWithFallback
                  src={coverImage}
                  alt={hack.title}
                  rank={hack.rank}
                  org={hack.org}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              {hack.gallery && hack.gallery.length > 0 && (
                <button
                  type="button"
                  onClick={() => onOpenGallery(hack, 0)}
                  className="text-xs font-mono text-white/50 hover:text-[#ff9a4d] transition-colors"
                >
                  📸 {hack.gallery.length} Photos
                </button>
              )}
              <Link
                to={`/achievements/${hack.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#ff9a4d] hover:text-white transition-colors"
              >
                Case Study
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

TimelineNode.propTypes = {
  hack: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
  onOpenGallery: PropTypes.func.isRequired,
};

/* ═══════════════════════════════════════════
   HACKATHON FORMULA PRINCIPLES
   ═══════════════════════════════════════════ */
const hackathonPrinciples = [
  {
    num: "01",
    title: "High-Velocity Architecture",
    text: "Zero over-engineering. In the first 4 hours, schema, routes, and core APIs are locked so the full-stack system can sprint completely unblocked.",
  },
  {
    num: "02",
    title: "Real Production, Zero Mocks",
    text: "Judges don't grade slide decks; they grade working code. Everything runs live on deployed servers with real databases and hardware telemetry.",
  },
  {
    num: "03",
    title: "High-Stakes Pitching",
    text: "Translating technical depth into crisp business impact, live unscripted demos, and proven scalability under state-level scrutiny.",
  },
];

/* ═══════════════════════════════════════════
   MAIN ACHIEVEMENTS PAGE COMPONENT
   ═══════════════════════════════════════════ */
export const Achievements = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'timeline'
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxData, setLightboxData] = useState({ hack: null, index: 0 });

  const openGallery = (hack, index = 0) => {
    setLightboxData({ hack, index });
  };

  const closeGallery = () => {
    setLightboxData({ hack: null, index: 0 });
  };

  // Category counts
  const counts = useMemo(() => {
    const map = { All: hackathons.length };
    achievementCategories.forEach((cat) => {
      if (cat !== "All") {
        map[cat] = hackathons.filter((h) => h.category === cat).length;
      }
    });
    return map;
  }, []);

  // Filtered hackathons
  const filteredHackathons = useMemo(() => {
    return hackathons.filter((h) => {
      const matchesCategory =
        activeCategory === "All" || h.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        h.title.toLowerCase().includes(query) ||
        h.org.toLowerCase().includes(query) ||
        h.text.toLowerCase().includes(query) ||
        h.year.toLowerCase().includes(query) ||
        h.rank.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Featured milestone (SSIP 2023 or top winner)
  const featuredHack = useMemo(
    () => hackathons.find((h) => h.featured) || hackathons[0],
    []
  );

  return (
    <ClickSpark
      color="#ff9a4d"
      count={10}
      size={14}
      radius={34}
      className="relative w-full overflow-hidden bg-[#020202]"
    >
      <SEO
        title="Achievements – Shah Dhairya, Hackathons & Awards"
        description="Hackathon achievements and milestones of Shah Dhairya — SSIP Hackathon 4th place in my sector out of 10,449 participants, Creato 2024 Best Innovative Project, CVMU Hackathon 2025, Gujarat Gaurav Award 2026, and Hackout 26."
        path="/achievements"
        jsonLd={breadcrumbJsonLd}
      />

      <AchievementsHeader />

      <div className="relative w-full overflow-hidden py-16 md:py-24">
        <DotGrid
          className="opacity-20"
          dotSize={1.5}
          gap={32}
          radius={160}
          activeColor="#ff9a4d"
        />
        <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[600px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[140px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-16 md:space-y-24">
          {/* ═════ 1. TRACK RECORD STATS BENTO ═════ */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <SectionEyebrow icon={Trophy}>Competitive Track Record</SectionEyebrow>
              </motion.div>

              {/* Status Ticker Chip */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] font-mono text-[10px] text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>STATE & NATIONAL ARENA PROVEN</span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statsData.map((a, i) => {
                const Icon = a.icon;
                return (
                  <SpotlightCard
                    key={a.label}
                    color="rgba(191, 68, 23, 0.28)"
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#bf4417]/50 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#bf4417]/15 border border-[#bf4417]/30 text-[#ff9a4d]">
                        <Icon size={18} />
                      </div>
                      <span className="font-mono text-[10px] text-white/30">
                        #0{i + 1}
                      </span>
                    </div>

                    <div className="font-display text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a4d] to-amber-200">
                      <StatCountUp
                        value={a.number}
                        suffixOverride={a.displaySuffix}
                      />
                    </div>

                    <div className="mt-2 text-xs font-bold uppercase tracking-wider text-white">
                      {a.label}
                    </div>

                    <p className="mt-1 text-[11px] text-white/45 font-light leading-snug">
                      {a.subtext}
                    </p>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>

          {/* ═════ 2. CROWNING MILESTONE SPOTLIGHT ═════ */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-8"
            >
              <SectionEyebrow icon={Sparkles}>Crowning Milestone</SectionEyebrow>
            </motion.div>

            <FeaturedMilestoneCard
              hack={featuredHack}
              onOpenGallery={openGallery}
            />
          </div>

          {/* ═════ 3. DIRECTORY CONTROLS: CATEGORIES + SEARCH + VIEW SWITCHER ═════ */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <SectionEyebrow icon={Award}>All Arena Records</SectionEyebrow>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
                  Milestones Under Pressure
                </h2>
              </div>

              {/* View Switcher: Grid vs Timeline */}
              <div className="flex items-center gap-2 p-1 rounded-xl border border-white/10 bg-white/[0.03] self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-[#bf4417] text-white shadow-md"
                      : "text-white/50 hover:text-white"
                  }`}
                  aria-label="Grid Showcase View"
                >
                  <LayoutGrid size={14} />
                  <span>Showcase</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("timeline")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === "timeline"
                      ? "bg-[#bf4417] text-white shadow-md"
                      : "text-white/50 hover:text-white"
                  }`}
                  aria-label="Chronological Timeline View"
                >
                  <GitCommitVertical size={14} />
                  <span>Timeline</span>
                </button>
              </div>
            </div>

            {/* Filter Pills & Search Bar Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <FilterPills
                categories={achievementCategories}
                active={activeCategory}
                counts={counts}
                onChange={setActiveCategory}
              />

              {/* Quick Search */}
              <div className="relative w-full sm:w-64">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  type="text"
                  placeholder="Filter wins & records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2 pl-9 pr-4 text-xs text-white placeholder-white/35 focus:border-[#bf4417] focus:outline-none focus:ring-1 focus:ring-[#bf4417] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ═════ 4. ACHIEVEMENTS LIST (GRID OR TIMELINE) ═════ */}
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7"
              >
                {filteredHackathons.map((hack, i) => (
                  <AchievementCard
                    key={hack.slug}
                    hack={hack}
                    index={i}
                    onOpenGallery={openGallery}
                  />
                ))}

                {filteredHackathons.length === 0 && (
                  <div className="col-span-full py-16 text-center">
                    <Trophy size={36} className="mx-auto text-white/20 mb-3" />
                    <p className="text-sm text-white/50">
                      No records match the current filter or search query.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory("All");
                        setSearchQuery("");
                      }}
                      className="mt-4 px-4 py-2 rounded-xl border border-white/10 text-xs text-[#ff9a4d] hover:bg-white/5 transition-all"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="timeline-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="max-w-4xl mx-auto pt-4"
              >
                {filteredHackathons.map((hack, i) => (
                  <TimelineNode
                    key={hack.slug}
                    hack={hack}
                    index={i}
                    isLast={i === filteredHackathons.length - 1}
                    onOpenGallery={openGallery}
                  />
                ))}

                {filteredHackathons.length === 0 && (
                  <div className="py-16 text-center">
                    <p className="text-sm text-white/50">
                      No records match the current filter or search query.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═════ 5. THE HACKATHON PLAYBOOK (PHILOSOPHY) ═════ */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-8"
            >
              <SectionEyebrow icon={Flame}>The Competitive Edge</SectionEyebrow>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
                How We Win Under 36-Hour Deadlines
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {hackathonPrinciples.map((item, idx) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: idx * 0.1, ease: EASE }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-7 hover:border-[#bf4417]/40 transition-colors duration-300"
                >
                  <span className="font-mono text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#bf4417]/80 to-[#bf4417]/20">
                    {item.num}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-white group-hover:text-[#ff9a4d] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-white/60 leading-relaxed font-light">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ═════ 6. JURY & MENTOR ENDORSEMENTS ═════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CVMU Judge Quote */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#bf4417]/60 to-transparent" />
              <div>
                <Quote size={24} className="text-[#bf4417] mb-4" />
                <p className="font-display text-lg sm:text-xl text-white/90 leading-relaxed">
                  &ldquo;The clarity of presentation and depth of technical
                  understanding set Dhairya&apos;s team apart.&rdquo;
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-6 bg-[#bf4417]/40" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#ff9a4d]">
                  — CVMU 2025 Hackathon Jury
                </span>
              </div>
            </motion.div>

            {/* BBIT & Institutional Gratitude */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
              <div>
                <Award size={24} className="text-amber-400 mb-4" />
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                  Special recognition to <strong className="text-white">BBIT Anand</strong> mentors
                  — Darshan Desai Sir, Rakesh Verma Sir, Hardik Sir — and state organizers Ankit Bhatmani & Mital Shah
                  for the proper direction and continuous guidance across these milestones.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-6 bg-amber-400/40" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  — Mentorship & Recognition
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═════ QUICK LIGHTBOX MODAL ═════ */}
      {lightboxData.hack && (
        <QuickLightboxModal
          hack={lightboxData.hack}
          initialIndex={lightboxData.index}
          onClose={closeGallery}
        />
      )}

      {/* ═════ PAGE CTA ═════ */}
      <PageCTA
        eyebrow="KEEP BUILDING"
        title="Want this energy on"
        accent="your team?"
        description="Awards are a byproduct of shipping under pressure. If you're building something ambitious, I'd love to hear about it."
        secondaryLabel="Explore Projects"
        secondaryTo="/projects"
      />
    </ClickSpark>
  );
};

export default Achievements;
