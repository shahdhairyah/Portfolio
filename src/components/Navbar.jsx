import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, FileText, Menu, X } from "lucide-react";
import { socials } from "@/data/profile";

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
  const [time, setTime] = useState("");
  const glowRef = useRef(null);
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location.pathname]);

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

  useEffect(() => {
    const read = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    read();
    const id = setInterval(read, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

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
        className="relative w-full max-w-6xl rounded-2xl"
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-700 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 30%, #bf4417 45%, #ea580c 50%, #bf4417 55%, transparent 70%, transparent 100%)",
            animation: "navbar-border-spin 5s linear infinite",
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
              ? "border-white/[0.09] bg-[#080808]/90 shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
              : "border-white/[0.06] bg-[#0a0a0a]/55"
          }`}
        >
          <div
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              "--glow-opacity": 0,
              opacity: "var(--glow-opacity)",
              transition: "opacity 500ms ease",
              background:
                "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(191,68,23,0.16), transparent 70%)",
            }}
          />

          <div className="relative flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-5 sm:py-3">
            {/* monogram + identity */}
            <Link
              to="/"
              className="group/logo flex min-w-0 items-center gap-2.5"
              aria-label="Shah Dhairya — home"
            >
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-500 group-hover/logo:rotate-6">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-xl border border-dashed border-[#bf4417]/40 transition-transform duration-700 group-hover/logo:rotate-90"
                />
                <span className="absolute inset-[3px] rounded-[9px] bg-gradient-to-br from-[#bf4417] via-[#ea580c] to-[#991b1b] shadow-[0_0_18px_rgba(191,68,23,0.45)]" />
                <span className="relative font-syne text-[11px] font-extrabold text-white">
                  SD
                </span>
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a0a0a] bg-emerald-400" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-syne text-sm font-bold leading-tight tracking-tight text-white sm:text-base">
                  Shah{" "}
                  <span className="bg-gradient-to-r from-[#ff9a4d] to-[#bf4417] bg-clip-text text-transparent">
                    Dhairya
                  </span>
                </span>
                <span className="hidden font-mono text-[8px] uppercase tracking-[0.24em] text-white/30 sm:block">
                  Full-Stack Developer
                </span>
              </span>
            </Link>

            {/* desktop navigation capsule */}
            <div className="hidden items-center rounded-full border border-white/[0.06] bg-white/[0.025] p-1 lg:flex">
              {navLinks.map((link, i) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={isCurrent(link.path)}
                    className="group/link relative rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors duration-200 xl:px-3.5 xl:text-xs"
                  >
                    {active && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-full border border-[#bf4417]/25 bg-[#bf4417]/10"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span
                      className={`relative flex items-center gap-1.5 ${
                        active
                          ? "text-[#ff9a4d]"
                          : "text-white/45 group-hover/link:text-white"
                      }`}
                    >
                      <span
                        className={`font-mono text-[8px] transition-colors ${
                          active
                            ? "text-[#bf4417]"
                            : "text-white/20 group-hover/link:text-[#bf4417]/70"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* utility rails */}
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 xl:flex">
                <Clock size={10} className="text-[#bf4417]" />
                IST {time || "--:--"}
              </span>

              <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.07] px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-400 md:flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Open
              </span>

              <Link
                to="/resume"
                className="group/resume hidden items-center gap-2 rounded-full border border-[#bf4417]/30 bg-gradient-to-r from-[#bf4417] to-[#991b1b] px-4 py-2 text-[11px] font-semibold text-white shadow-[0_0_18px_rgba(191,68,23,0.28)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(191,68,23,0.5)] md:inline-flex"
              >
                <FileText size={13} />
                Resume
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover/resume:translate-x-0.5 group-hover/resume:-translate-y-0.5"
                />
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 hover:border-[#bf4417]/40 hover:text-white lg:hidden"
              >
                {isOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>
          </div>

          {/* scroll progress */}
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
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden border-t border-white/[0.06] lg:hidden"
              >
                <div className="relative px-3.5 pb-5 pt-4">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(191,68,23,0.14),transparent_60%)]"
                  />

                  <div className="relative mb-4 flex items-center justify-between px-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/30">
                      Navigate
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#bf4417]/80">
                      IST {time || "--:--"}
                    </span>
                  </div>

                  <nav className="relative flex flex-col gap-1.5">
                    {navLinks.map((link, i) => {
                      const active = isActive(link.path);
                      return (
                        <motion.div
                          key={link.path}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.24, delay: i * 0.04, ease: EASE }}
                        >
                          <Link
                            to={link.path}
                            aria-current={isCurrent(link.path)}
                            className={`group relative flex items-center justify-between overflow-hidden rounded-xl border px-3.5 py-3 transition-all duration-300 ${
                              active
                                ? "border-[#bf4417]/30 bg-[#bf4417]/10 text-[#ff9a4d]"
                                : "border-white/[0.06] bg-white/[0.02] text-white/60 hover:border-white/15 hover:text-white"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`font-mono text-[10px] font-bold ${
                                  active ? "text-[#bf4417]" : "text-white/20"
                                }`}
                              >
                                0{i + 1}
                              </span>
                              <span className="text-sm font-medium">{link.name}</span>
                            </span>
                            <ArrowUpRight
                              size={14}
                              className={`transition-all duration-300 ${
                                active
                                  ? "text-[#bf4417]"
                                  : "text-white/15 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#bf4417]"
                              }`}
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  <div className="relative mt-4 flex items-center gap-2">
                    <Link
                      to="/resume"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#bf4417] to-[#991b1b] py-2.5 text-xs font-semibold text-white shadow-[0_0_16px_rgba(191,68,23,0.3)]"
                    >
                      <FileText size={14} />
                      Resume
                    </Link>
                    {socials.slice(0, 2).map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[10px] font-bold uppercase text-white/50 transition-colors hover:border-[#bf4417]/40 hover:text-[#ff9a4d]"
                      >
                        {social.label.slice(0, 2)}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
