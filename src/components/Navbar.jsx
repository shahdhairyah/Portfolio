import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Achievements", path: "/achievements" },
  { name: "Contact", path: "/contact" },
];

const EASE = [0.16, 1, 0.3, 1];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const glowRef = useRef(null);
  const location = useLocation();

  /* Close the mobile sheet on every route change */
  useEffect(() => setIsOpen(false), [location.pathname]);

  /* Scroll position drives both the surface state and the progress bar */
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* Escape closes the sheet */
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  /* Lock background scroll while the sheet is open */
  useEffect(() => {
    if (!isOpen) return undefined;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [isOpen]);

  /* Write cursor position straight to CSS vars — no re-render per mousemove.
     Opacity is driven from JS rather than a group-hover rule: the glow is
     pointer-events-none, so it can never match :hover itself. */
  const handleMouseMove = useCallback((e) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    glowRef.current?.style.setProperty("--glow-opacity", "1");
  }, []);

  const handleMouseLeave = useCallback(() => {
    glowRef.current?.style.setProperty("--glow-opacity", "0");
  }, []);

  /* Exact match for home, segment match for everything else, so
     /projects/:slug keeps "Projects" lit */
  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  const isCurrent = (path) =>
    isActive(path) && location.pathname === path ? "page" : undefined;

  return (
    <nav className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:px-4">
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-5xl rounded-2xl"
      >
        {/* rotating conic border, revealed once the page scrolls */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-700 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 30%, #bf4417 45%, #ea580c 50%, #bf4417 55%, transparent 70%, transparent 100%)",
            animation: "navbar-border-spin 4s linear infinite",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />

        <div
          className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? "border-white/[0.08] bg-[#0a0a0a]/85 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              : "border-white/[0.06] bg-[#0a0a0a]/60"
          }`}
        >
          {/* cursor-tracking glow */}
          <div
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              "--glow-opacity": 0,
              opacity: "var(--glow-opacity)",
              transition: "opacity 500ms ease",
              background:
                "radial-gradient(280px circle at var(--mx,50%) var(--my,50%), rgba(191,68,23,0.14), transparent 70%)",
            }}
          />

          <div className="relative flex items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5">
            <Link
              to="/"
              className="group/logo flex items-center gap-2.5"
              aria-label="Shah Dhairya — home"
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#bf4417] via-[#ea580c] to-[#991b1b] text-white shadow-[0_0_14px_rgba(191,68,23,0.45)] transition-transform duration-300 group-hover/logo:rotate-6">
                <span className="font-syne text-[11px] font-extrabold">SD</span>
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-[#0a0a0a] bg-emerald-400" />
                <span aria-hidden className="pointer-events-none absolute inset-[-4px]">
                  <span
                    className="absolute left-1/2 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bf4417]"
                    style={{ animation: "navbar-orbit 3s linear infinite" }}
                  />
                </span>
              </span>
              <span className="font-syne text-base font-bold tracking-tight text-white transition-colors duration-200 group-hover/logo:text-[#ff8a5c] sm:text-lg">
                Shah{" "}
                <span className="bg-gradient-to-r from-[#bf4417] to-[#991b1b] bg-clip-text text-transparent">
                  Dhairya
                </span>
              </span>
            </Link>

            {/* desktop links */}
            <div className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={isCurrent(link.path)}
                    className="group/link relative py-1 text-xs font-medium transition-colors duration-200"
                  >
                    <span
                      className={`transition-colors duration-200 ${
                        active
                          ? "text-[#ff9a4d]"
                          : "text-white/50 group-hover/link:text-white"
                      }`}
                    >
                      {link.name}
                    </span>
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#bf4417] via-[#ea580c] to-[#991b1b] transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover/link:w-full"
                      }`}
                    />
                  </Link>
                );
              })}

              <Link
                to="/resume"
                className="inline-flex items-center gap-2 rounded-xl border border-[#bf4417]/25 bg-gradient-to-r from-[#bf4417] to-[#991b1b] px-4 py-2 text-xs font-medium text-white shadow-[0_0_14px_rgba(191,68,23,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:from-[#ea580c] hover:to-[#7f1d1d] hover:shadow-[0_0_22px_rgba(191,68,23,0.5)]"
              >
                <FileText size={14} />
                Resume
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="-mr-1 rounded-lg p-2 text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white lg:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* reading progress */}
          <div
            aria-hidden
            className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-[#bf4417] via-[#ea580c] to-[#991b1b] transition-opacity duration-500 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: `scaleX(${progress})` }}
          />

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-nav"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a]/95 backdrop-blur-2xl lg:hidden"
              >
                <nav className="flex flex-col gap-1 px-4 pb-4 pt-3">
                  {navLinks.map((link, i) => {
                    const active = isActive(link.path);
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.22, delay: i * 0.035, ease: EASE }}
                      >
                        <Link
                          to={link.path}
                          aria-current={isCurrent(link.path)}
                          className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300 ${
                            active
                              ? "bg-[#bf4417]/10 text-[#ff9a4d]"
                              : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#bf4417] to-transparent transition-opacity duration-300 ${
                              active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                          />
                          <span
                            className={`font-mono text-[10px] font-bold ${
                              active ? "text-[#bf4417]" : "text-white/25"
                            }`}
                          >
                            0{i + 1}
                          </span>
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}

                  <div className="mt-2 border-t border-white/[0.06] pt-3">
                    <Link
                      to="/resume"
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#bf4417] to-[#991b1b] py-2.5 text-xs font-medium text-white shadow-[0_0_14px_rgba(191,68,23,0.3)]"
                    >
                      <FileText size={14} />
                      Resume
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;