import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Trophy, Sparkles, Users, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
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

  const Icon = hack.icon;

  return (
    <main className="relative w-full min-h-screen bg-[#020202] text-white flex flex-col items-center py-[4vh] pb-40 px-[4vw] overflow-hidden font-sans">
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
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

            {hack.image && (
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
                  A peek behind the scenes — every frame below tells a part of the SSIP story.
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
              <Link
                to="/achievements"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#bf4417] to-[#991b1b] hover:from-[#ea580c] hover:to-[#7f1d1d] text-sm font-semibold text-white transition-all duration-300 shadow-[0_0_18px_rgba(191,68,23,0.35)]"
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
    </main>
  );
};

export default AchievementDetails;
