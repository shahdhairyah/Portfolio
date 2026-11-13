import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Sparkles,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  ExternalLink,
  FileCheck,
  Award,
  Globe,
  CheckCircle2,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import PageCTA from "@/components/shared/PageCTA";
import ClickSpark from "@/components/reactbits/ClickSpark";
import DotGrid from "@/components/reactbits/DotGrid";
import { hackathons } from "@/data/achievements";

const EASE = [0.16, 1, 0.3, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

export const AchievementDetails = () => {
  const { slug } = useParams();
  const hack = hackathons.find((h) => h.slug === slug);
  const [lightbox, setLightbox] = useState(null);
  const [activeDocId, setActiveDocId] = useState(
    hack?.documents?.[0]?.id || "paper"
  );

  useEffect(() => {
    if (hack?.documents?.[0]?.id) {
      setActiveDocId(hack.documents[0].id);
    }
  }, [slug, hack]);

  const currentDoc =
    hack?.documents?.find((d) => d.id === activeDocId) ||
    hack?.documents?.[0];

  const gallery = hack?.gallery || [];

  const closeLightbox = () => setLightbox(null);

  const goPrev = useCallback(
    () => setLightbox((i) => (i - 1 + gallery.length) % gallery.length),
    [gallery.length]
  );
  const goNext = useCallback(
    () => setLightbox((i) => (i + 1) % gallery.length),
    [gallery.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, goNext, goPrev]);

  /* Touch swipe for mobile gallery navigation */
  const touchStart = useRef(null);

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e) => {
    if (!touchStart.current || gallery.length < 2) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) goPrev();
    else goNext();
  };

  if (!hack) {
    return <Navigate to="/achievements" replace />;
  }

  const isResearchPaper = hack.slug === "ijrti-research-paper-2026";

  const citationData = isResearchPaper
    ? {
        title:
          hack.paperTitle ||
          "An Arduino-Based Waterlogging Detection and Barrier-Control Prototype for Subterranean Infrastructure",
        author: "Shah, Dhairya",
        date: "2026/10",
        journal: "International Journal for Research Trends and Innovation",
        issn: "2456-3315",
        volume: "11",
        issue: "10",
        doi: "10.56975/ijrti.v11i10.301844",
        pdfUrl: "https://shahdhairyah.in/papers/IJRTI2610697.pdf",
      }
    : null;

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://shahdhairyah.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Achievements",
          "item": "https://shahdhairyah.in/achievements",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": hack.title,
          "item": `https://shahdhairyah.in/achievements/${hack.slug}`,
        },
      ],
    },
    ...(isResearchPaper
      ? [
          {
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline:
              hack.paperTitle ||
              "An Arduino-Based Waterlogging Detection and Barrier-Control Prototype for Subterranean Infrastructure",
            name: hack.title,
            description: hack.text,
            author: {
              "@type": "Person",
              name: "Shah Dhairya",
              url: "https://shahdhairyah.in",
              jobTitle: "Student Researcher & Full-Stack Developer",
              affiliation: {
                "@type": "EducationalOrganization",
                name: "A. D. Patel Institute of Technology (ADIT), CVM University",
              },
            },
            datePublished: "2026-10",
            inLanguage: "en",
            identifier: "10.56975/ijrti.v11i10.301844",
            sameAs: [
              "https://doi.org/10.56975/ijrti.v11i10.301844",
              "https://ijrti.org/viewpaperforall.php?paper=IJRTI2610697",
              "https://ijrti.org/papers/IJRTI2610697.pdf",
            ],
            publisher: {
              "@type": "Organization",
              name: "International Journal for Research Trends and Innovation (IJRTI)",
              url: "https://ijrti.org",
              issn: "2456-3315",
            },
            isPartOf: {
              "@type": "PublicationVolume",
              volumeNumber: "11",
              issueNumber: "10",
              isPartOf: {
                "@type": "Periodical",
                name: "International Journal for Research Trends and Innovation",
                issn: "2456-3315",
              },
            },
            image: "https://shahdhairyah.in/images/achievement/ijrti-paper-2026-cover.webp",
            encoding: {
              "@type": "MediaObject",
              contentUrl: "https://shahdhairyah.in/papers/IJRTI2610697.pdf",
              encodingFormat: "application/pdf",
            },
          },
        ]
      : []),
  ];

  const Icon = hack.icon;

  return (
    <ClickSpark color="#ff9a4d" count={10} size={14} radius={34} className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#020202] px-[4vw] py-[4vh] pb-40 font-sans text-white">
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
      <DotGrid className="opacity-20" dotSize={1.5} gap={32} radius={150} activeColor="#ff9a4d" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] blur-[140px] opacity-10 pointer-events-none" />

      <span
        aria-hidden
        className="pointer-events-none select-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-extrabold leading-none text-[28vw] md:text-[18rem] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.04)]"
      >
        {hack.rank}
      </span>

      <SEO
        title={`${hack.title} – Shah Dhairya Achievements`}
        description={hack.text}
        path={`/achievements/${hack.slug}`}
        image={hack.image || "/images/achievement/ijrti-paper-2026-cover.webp"}
        type={isResearchPaper ? "article" : "website"}
        citation={citationData}
        jsonLd={jsonLdData}
        keywords={
          isResearchPaper
            ? "Shah Dhairya research paper, IJRTI, 2456-3315, 10.56975/ijrti.v11i10.301844, waterlogging detection Arduino, subterranean infrastructure prototype, CVM University, ADIT"
            : undefined
        }
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div {...reveal()}>
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-[#ff9a4d] transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Achievements
          </Link>
        </motion.div>

        <motion.div
          {...reveal(0.1)}
          className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
        >
          <div className="h-1 bg-gradient-to-r from-[#bf4417] via-amber-500 to-[#991b1b]" />

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#bf4417]/20 to-[#991b1b]/10 border border-[#bf4417]/30 text-[#ff9a4d] shadow-[0_0_24px_rgba(191,68,23,0.3)]">
                <Icon size={28} />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-md bg-[#bf4417]/10 border border-[#bf4417]/30 text-[11px] font-bold text-[#ff9a4d]">
                  {hack.org}
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-mono">
                  {hack.year}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 ml-auto px-3.5 py-2 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 text-sm font-bold font-mono">
                <Trophy size={14} />
                {hack.rank}
              </span>
            </div>

            <h1 className="mt-8 font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              {hack.title}
            </h1>

            {hack.paperTitle && (
              <div className="mt-4 p-4 rounded-xl border border-[#bf4417]/30 bg-[#bf4417]/[0.08] backdrop-blur-sm">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#ff9a4d] mb-1">
                  Published Paper Title
                </span>
                <p className="font-display text-base sm:text-lg text-white font-medium italic">
                  &ldquo;{hack.paperTitle}&rdquo;
                </p>
              </div>
            )}

            <p className="mt-5 text-white/60 leading-relaxed text-base md:text-lg">
              {hack.text}
            </p>

            {hack.story && (
              <motion.blockquote
                {...reveal(0.15)}
                className="relative mt-8 pl-6 md:pl-8 py-2"
              >
                <span className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-[#ff9a4d] to-[#991b1b]" />
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="absolute -top-3 -left-1 w-9 h-9 text-[#bf4417]/25"
                >
                  <path d="M10 7.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5c0-.3 0-.6-.1-.9C13.6 8.4 11.9 7.2 10 7.5Zm8.5 0c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5c0-.3 0-.6-.1-.9-.3-1.2-2-2.4-3.9-2.1l-.5-.8Z" />
                </svg>
                <p className="font-display text-lg md:text-xl text-white/85 leading-relaxed">
                  {hack.story}
                </p>
              </motion.blockquote>
            )}

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {hack.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="px-5 py-6 rounded-2xl bg-white/[0.02] border border-white/5 border-l-2 border-l-[#bf4417]"
                >
                  <div className="font-display text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a4d] to-[#991b1b]">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/50">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Document Showcase (Research Paper, Certificate, Acceptance Letter) */}
            {hack.documents && hack.documents.length > 0 && currentDoc && (
              <motion.div
                {...reveal(0.2)}
                className="mt-10 overflow-hidden rounded-3xl border border-[#bf4417]/35 bg-gradient-to-b from-[#160803]/80 via-[#0a0a0a] to-[#040404] shadow-[0_0_50px_rgba(191,68,23,0.22)] backdrop-blur-md"
              >
                {/* Stage Header / Document Control Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 md:p-6 border-b border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#bf4417]/30 to-[#991b1b]/20 border border-[#bf4417]/40 text-[#ff9a4d] shadow-[0_0_18px_rgba(191,68,23,0.35)] shrink-0">
                      {currentDoc.id === "paper" ? (
                        <FileText size={22} />
                      ) : currentDoc.id === "certificate" ? (
                        <Award size={22} />
                      ) : (
                        <CheckCircle2 size={22} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#bf4417]/20 border border-[#bf4417]/40 text-[#ff9a4d]">
                          {currentDoc.badge}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Verified Official Document
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-base sm:text-lg md:text-xl font-bold text-white truncate">
                        {currentDoc.title}
                      </h3>
                      <p className="text-xs text-white/50 truncate">
                        {currentDoc.meta}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {currentDoc.type === "pdf" && currentDoc.pdfUrl && (
                      <a
                        href={currentDoc.pdfUrl}
                        download="IJRTI2610697-Dhairya-Shah.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#bf4417] hover:bg-[#d8501c] text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-[0_0_20px_rgba(191,68,23,0.4)] hover:scale-[1.02]"
                      >
                        <Download size={14} />
                        Download PDF
                      </a>
                    )}
                    {currentDoc.externalUrl && (
                      <a
                        href={currentDoc.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-white text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-[1.02]"
                      >
                        {currentDoc.id === "paper"
                          ? "Official IJRTI Link"
                          : currentDoc.id === "certificate"
                          ? "Verify on IJRTI"
                          : "Verify Letter"}
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Main Stage Preview Viewer */}
                <div className="relative w-full bg-black/80 flex flex-col items-center justify-center min-h-[460px] md:min-h-[660px]">
                  <AnimatePresence mode="wait">
                    {currentDoc.id === "paper" ? (
                      <motion.div
                        key="doc-paper"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="w-full flex flex-col"
                      >
                        {/* Interactive PDF Viewer Embed */}
                        <div className="w-full h-[520px] sm:h-[650px] md:h-[720px] relative bg-neutral-950">
                          <iframe
                            src={`${currentDoc.pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
                            title="IJRTI Research Paper PDF Viewer"
                            className="w-full h-full border-0"
                          />
                        </div>

                        {/* Document Metadata Bar */}
                        <div className="px-5 py-3 border-t border-white/10 bg-black/60 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[#ff9a4d]">Paper ID: IJRTI2610697</span>
                            <span>·</span>
                            <span>ISSN: 2456-3315</span>
                            <span>·</span>
                            <a
                              href="https://doi.org/10.56975/ijrti.v11i10.301844"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-400 hover:underline inline-flex items-center gap-1 font-mono"
                            >
                              DOI: 10.56975/ijrti.v11i10.301844 <ArrowUpRight size={11} />
                            </a>
                          </div>
                          <a
                            href={currentDoc.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#ff9a4d] hover:text-white transition-colors"
                          >
                            Open full PDF in new tab <ExternalLink size={12} />
                          </a>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={currentDoc.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="w-full flex flex-col items-center p-4 sm:p-6 md:p-8"
                      >
                        <div className="relative max-w-3xl w-full rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl group">
                          <img
                            src={currentDoc.imageUrl}
                            alt={currentDoc.title}
                            className="w-full h-auto object-contain max-h-[640px] mx-auto bg-black/40"
                          />
                          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-4 right-4 flex items-center gap-2">
                            <a
                              href={currentDoc.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-[#bf4417] border border-white/20 text-white text-xs font-semibold backdrop-blur-md transition-colors shadow-lg"
                            >
                              Verify on IJRTI Portal <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>

                        {/* Live official document link & verification box */}
                        <div className="mt-5 w-full max-w-3xl rounded-2xl border border-[#bf4417]/30 bg-gradient-to-r from-[#bf4417]/10 via-black/40 to-black/20 p-4 md:p-5 flex flex-wrap items-center justify-between gap-4 text-left shadow-lg backdrop-blur-sm">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 inline-flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Official Live Link
                              </span>
                              <span className="text-xs text-white/60 font-mono">
                                {currentDoc.meta}
                              </span>
                            </div>
                            <a
                              href={currentDoc.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1.5 block font-mono text-xs text-[#ff9a4d] hover:text-white hover:underline truncate"
                            >
                              {currentDoc.externalUrl}
                            </a>
                            <p className="mt-1 text-xs text-white/50 leading-relaxed">
                              {currentDoc.desc}
                            </p>
                          </div>
                          <a
                            href={currentDoc.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#bf4417] to-[#d8501c] hover:brightness-110 text-white text-xs font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(191,68,23,0.35)] shrink-0 hover:scale-[1.02]"
                          >
                            <span>Open Official Portal</span>
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3-Cover Selector Row: Same Line for all 3 covers */}
                <div className="p-4 md:p-6 bg-gradient-to-t from-black via-black/95 to-black/70 border-t border-white/10">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                      Document Showcase · Select Cover to Switch View
                    </span>
                    <span className="text-[11px] font-mono text-[#ff9a4d]">
                      {activeDocId === "paper"
                        ? "1/3 · Paper PDF"
                        : activeDocId === "certificate"
                        ? "2/3 · Certificate"
                        : "3/3 · Acceptance Letter"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                    {hack.documents.map((doc) => {
                      const isActive = activeDocId === doc.id;
                      return (
                        <button
                          key={doc.id}
                          type="button"
                          onClick={() => setActiveDocId(doc.id)}
                          className={`group relative text-left rounded-2xl overflow-hidden p-3 transition-all duration-300 border ${
                            isActive
                              ? "border-[#ff9a4d] ring-2 ring-[#bf4417]/60 bg-gradient-to-b from-[#bf4417]/25 via-white/[0.04] to-transparent shadow-[0_0_25px_rgba(191,68,23,0.35)]"
                              : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05] opacity-75 hover:opacity-100"
                          }`}
                        >
                          {/* Thumbnail preview */}
                          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 mb-3">
                            <img
                              src={doc.coverImage}
                              alt={doc.title}
                              loading="lazy"
                              className={`w-full h-full object-cover object-top transition-transform duration-500 ${
                                isActive ? "scale-105" : "group-hover:scale-105"
                              }`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            {/* Active Indicator Badge */}
                            {isActive && (
                              <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white font-mono text-[9px] uppercase tracking-wider font-semibold shadow-md backdrop-blur-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                Active View
                              </span>
                            )}

                            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 border border-white/15 text-[10px] font-mono text-[#ff9a4d]">
                              {doc.badge}
                            </span>
                          </div>

                          {/* Text details */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <span
                                className={`block font-display text-sm font-bold truncate ${
                                  isActive
                                    ? "text-[#ff9a4d]"
                                    : "text-white group-hover:text-white/90"
                                }`}
                              >
                                {doc.title}
                              </span>
                              <span className="block text-[11px] text-white/50 truncate mt-0.5">
                                {doc.subtitle}
                              </span>
                            </div>
                            <div
                              className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 transition-colors ${
                                isActive
                                  ? "bg-[#bf4417] text-white"
                                  : "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white"
                              }`}
                            >
                              <ArrowUpRight size={14} />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {hack.image && !hack.documents && (
              <motion.div
                {...reveal(0.2)}
                className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black/30"
              >
                <img
                  src={hack.image}
                  alt={hack.title}
                  className="w-full h-auto max-h-[560px] object-contain bg-black/30"
                />
              </motion.div>
            )}

            {hack.team && hack.team.length > 0 && (
              <div className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-6 md:p-8">
                <div className="flex items-center gap-2.5">
                  <Users size={16} className="text-[#bf4417]" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-white/80">
                    Team Members
                  </h2>
                </div>
                <div className="mt-6 space-y-4">
                  {hack.team.map((m, i) => (
                    <motion.div
                      key={m.name}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                      className="flex items-center gap-4"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#bf4417]/20 to-[#991b1b]/10 border border-[#bf4417]/30 text-[#ff9a4d] font-display font-bold">
                        {m.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                      </span>
                      <div>
                        <div className="text-white font-semibold">{m.name}</div>
                        <div className="text-[12px] text-white/50">{m.role}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {hack.links && !hack.documents && (
              <motion.div
                {...reveal(0.22)}
                className="mt-10 rounded-2xl border border-[#bf4417]/35 bg-gradient-to-b from-[#bf4417]/10 via-black/40 to-black/30 p-6 md:p-8 shadow-[0_0_35px_rgba(191,68,23,0.18)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <FileCheck size={18} className="text-[#ff9a4d]" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                      Official Links &amp; Verification Documents
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 font-mono text-[10px] uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified &amp; Indexed
                  </span>
                </div>
                <p className="mt-2 text-xs md:text-sm text-white/60 leading-relaxed font-light">
                  {hack.links.intro ||
                    (hack.links.paper
                      ? "Access the official published paper, registered Crossref DOI identifier, author certificate of publication, and confirmation letter from IJRTI."
                      : "Access the official verified certificates and credentials for this milestone.")}
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {hack.links.paper && (
                    <a
                      href={hack.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#bf4417] hover:bg-white/[0.05] transition-all duration-300 shadow-lg"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/50 border-b border-white/10">
                        <img
                          src={hack.links.paperPreview || hack.image || hack.gallery?.[0]}
                          alt="Research Paper Preview"
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/80 border border-white/15 text-[10px] font-bold uppercase tracking-wider text-[#ff9a4d] backdrop-blur-md">
                          <FileText size={11} />
                          Paper PDF
                        </span>
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/75 border border-white/10 px-2 py-0.5 rounded backdrop-blur-md">
                          Open PDF <ExternalLink size={11} />
                        </span>
                      </div>
                      <div className="p-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="block text-sm font-bold text-white group-hover:text-[#ff9a4d] transition-colors truncate">
                            Read Research Paper (PDF)
                          </span>
                          <span className="block text-[11px] font-mono text-white/45 truncate mt-0.5">
                            Full Published Paper · IJRTI
                          </span>
                        </div>
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#bf4417]/20 border border-[#bf4417]/40 text-[#ff9a4d] group-hover:scale-110 transition-transform shrink-0">
                          <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </a>
                  )}

                  {hack.links.doi && (
                    <a
                      href={hack.links.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/60 hover:bg-white/[0.05] transition-all duration-300 shadow-lg"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/50 border-b border-white/10">
                        <img
                          src={hack.links.doiPreview || hack.gallery?.[1] || hack.image}
                          alt="DOI Indexing Preview"
                          loading="lazy"
                          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/80 border border-white/15 text-[10px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                          <Globe size={11} />
                          DOI Index
                        </span>
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/75 border border-white/10 px-2 py-0.5 rounded backdrop-blur-md">
                          View Index <ExternalLink size={11} />
                        </span>
                      </div>
                      <div className="p-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="block text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                            DOI Publication Index
                          </span>
                          <span className="block text-[11px] font-mono text-white/45 truncate mt-0.5">
                            10.56975/ijrti.v11i10.301844
                          </span>
                        </div>
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-300 group-hover:scale-110 transition-transform shrink-0">
                          <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </a>
                  )}

                  {hack.links.certificate && (
                    <a
                      href={hack.links.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-emerald-400/60 hover:bg-white/[0.05] transition-all duration-300 shadow-lg"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/50 border-b border-white/10">
                        {hack.links.certificatePreview ? (
                          <img
                            src={hack.links.certificatePreview}
                            alt="Certificate Preview"
                            loading="lazy"
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-950/40 via-black/60 to-black p-4 text-center">
                            <Award size={36} className="text-emerald-400/60 mb-2" />
                            <span className="font-display text-sm font-bold text-white/80">
                              {hack.links.certificateLabel || "Official Certificate"}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/80 border border-white/15 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                          <Award size={11} />
                          Certificate
                        </span>
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/75 border border-white/10 px-2 py-0.5 rounded backdrop-blur-md">
                          Verify <ExternalLink size={11} />
                        </span>
                      </div>
                      <div className="p-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="block text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                            {hack.links.certificateLabel || "Publication Certificate"}
                          </span>
                          <span className="block text-[11px] font-mono text-white/45 truncate mt-0.5">
                            {hack.links.certificateSubtext || "Verified Official Certificate"}
                          </span>
                        </div>
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 group-hover:scale-110 transition-transform shrink-0">
                          <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </a>
                  )}

                  {hack.links.confirmationLetter && (
                    <a
                      href={hack.links.confirmationLetter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-blue-400/60 hover:bg-white/[0.05] transition-all duration-300 shadow-lg"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/50 border-b border-white/10">
                        {hack.links.confirmationLetterPreview ? (
                          <img
                            src={hack.links.confirmationLetterPreview}
                            alt="Confirmation Letter Preview"
                            loading="lazy"
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-blue-950/40 via-black/60 to-black p-4 text-center">
                            <CheckCircle2 size={36} className="text-blue-400/60 mb-2" />
                            <span className="font-display text-sm font-bold text-white/80">
                              Confirmation Letter
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/80 border border-white/15 text-[10px] font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md">
                          <CheckCircle2 size={11} />
                          Letter
                        </span>
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/75 border border-white/10 px-2 py-0.5 rounded backdrop-blur-md">
                          View Letter <ExternalLink size={11} />
                        </span>
                      </div>
                      <div className="p-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="block text-sm font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                            {hack.links.confirmationLetterLabel || "Confirmation Letter"}
                          </span>
                          <span className="block text-[11px] font-mono text-white/45 truncate mt-0.5">
                            {hack.links.confirmationLetterSubtext || "Official Acceptance Letter"}
                          </span>
                        </div>
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-400/15 border border-blue-400/30 text-blue-300 group-hover:scale-110 transition-transform shrink-0">
                          <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </a>
                  )}
                </div>
              </motion.div>
            )}

            <div className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-6 md:p-8">
              <div className="flex items-center gap-2.5">
                <Sparkles size={16} className="text-[#bf4417]" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/80">
                  Full Details
                </h2>
              </div>
              <ul className="mt-6 space-y-4">
                {hack.details.map((d, i) => (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                    className="flex items-start gap-3.5 text-white/70 leading-relaxed"
                  >
                    <span className="mt-1.5 w-2 h-2 rotate-45 bg-[#bf4417] shrink-0" />
                    {d}
                  </motion.li>
                ))}
              </ul>
            </div>

            {gallery.length > 0 && (
              <div className="mt-14">
                <motion.div {...reveal(0.1)} className="flex items-end gap-2.5">
                  <Sparkles size={18} className="text-[#bf4417]" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-white/80">
                    Moments from the journey
                  </h2>
                  <span className="ml-auto flex items-center justify-center min-w-9 h-9 px-2 rounded-full bg-[#bf4417]/10 border border-[#bf4417]/30 text-[#ff9a4d] text-xs font-mono font-bold">
                    {gallery.length} photos
                  </span>
                </motion.div>
                <p className="mt-3 mb-8 text-sm text-white/50 leading-relaxed">
                  A peek behind the scenes — every frame below tells a part of this journey.
                  Tap any photo to view it up close.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  {gallery.map((src, i) => (
                    <motion.button
                      type="button"
                      key={src}
                      initial={{ opacity: 0, y: 24, rotate: i % 2 ? 1.5 : -1.5 }}
                      whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2.5 : -2.5 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: EASE }}
                      whileHover={{ rotate: 0, scale: 1.02, y: -4 }}
                      onClick={() => setLightbox(i)}
                      className="group relative flex flex-col cursor-zoom-in rounded-xl bg-white/[0.04] border border-white/10 p-3 pb-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] text-left"
                    >
                      <span className="absolute -top-3 -right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#bf4417] to-[#991b1b] text-white text-xs font-mono font-bold shadow-[0_0_16px_rgba(191,68,23,0.5)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="relative overflow-hidden rounded-lg bg-black/30">
                        <img
                          src={src}
                          alt={`${hack.title} photo ${i + 1}`}
                          loading="lazy"
                          className="w-full h-52 md:h-72 object-contain bg-black/30 transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                          <span className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest text-white bg-white/10 backdrop-blur-sm border border-white/15">
                            View full size
                          </span>
                        </span>
                      </span>
                      <span className="mt-4 flex items-start gap-2.5 px-1">
                        <span className="w-1 self-stretch shrink-0 rounded-full bg-gradient-to-b from-[#ff9a4d] to-[#991b1b]/60" />
                        <span className="text-[13px] leading-relaxed text-white/55">
                          {hack.captions && hack.captions[i]
                            ? hack.captions[i]
                            : `${hack.title} — photo ${i + 1}`}
                        </span>
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence>
              {lightbox !== null && gallery[lightbox] && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeLightbox}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-[4vw]"
                >
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={closeLightbox}
                    className="absolute top-5 right-5 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white z-50"
                  >
                    <X size={20} />
                  </button>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    disabled={gallery.length < 2}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <motion.img
                    key={lightbox}
                    src={gallery[lightbox]}
                    alt={`${hack.title} photo ${lightbox + 1}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-full max-h-full object-contain rounded-xl"
                  />
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    disabled={gallery.length < 2}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 px-4 py-1.5 rounded-full bg-white/10 text-sm text-white/80 font-mono">
                    {lightbox + 1} / {gallery.length}
                    {gallery.length > 1 && (
                      <span className="text-[9px] uppercase tracking-[0.16em] text-white/50 sm:hidden">
                        Swipe to browse
                      </span>
                    )}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap gap-4">
              {hack.links?.paper && (
                <a
                  href={hack.links.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#bf4417] to-[#991b1b] hover:from-[#ea580c] hover:to-[#7f1d1d] text-sm font-semibold text-white transition-all duration-300 shadow-[0_0_18px_rgba(191,68,23,0.35)]"
                >
                  <FileText size={15} />
                  Read Research Paper (PDF)
                </a>
              )}
              {hack.links?.certificate && !hack.links?.paper && (
                <a
                  href={hack.links.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#bf4417] to-[#991b1b] hover:from-[#ea580c] hover:to-[#7f1d1d] text-sm font-semibold text-white transition-all duration-300 shadow-[0_0_18px_rgba(191,68,23,0.35)]"
                >
                  <Award size={15} />
                  View Certificate
                </a>
              )}
              <Link
                to="/achievements"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  hack.links?.paper || hack.links?.certificate
                    ? "border border-white/15 text-white/80 hover:text-white hover:border-white/30 bg-white/[0.03]"
                    : "bg-gradient-to-r from-[#bf4417] to-[#991b1b] hover:from-[#ea580c] hover:to-[#7f1d1d] text-white shadow-[0_0_18px_rgba(191,68,23,0.35)]"
                }`}
              >
                <ArrowLeft size={15} />
                All Achievements
              </Link>
              <a
                href="mailto:sdhairyah@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-sm font-semibold text-white/70 hover:text-[#ff9a4d] hover:border-[#bf4417]/50 transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <PageCTA
        eyebrow="THE NEXT MILESTONE"
        title="Let's write the"
        accent="next story."
        description="Every award began as a team shipping under a deadline. If you're building something worth competing for, count me in."
        secondaryLabel="All Achievements"
        secondaryTo="/achievements"
      />
    </ClickSpark>
  );
};

export default AchievementDetails;
