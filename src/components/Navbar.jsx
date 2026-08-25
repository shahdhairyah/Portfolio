import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setIsOpen(false), [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleHashClick = (e, path) => {
    if (!path.startsWith("#")) return;
    e.preventDefault();
    const targetId = path.replace("#", "");
    if (location.pathname === "/") {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: targetId } });
    }
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-4 flex justify-center">
      <div
        ref={navRef}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-4xl rounded-2xl"
        style={{ backdropFilter: "blur(20px)" }}
      >
        {/* --- rotating gradient border (visible on scroll) --- */}
        <div
          className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-700 pointer-events-none ${
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

        {/* --- solid container --- */}
        <div
          className={`relative rounded-2xl border transition-all duration-500 ${
            scrolled
              ? "bg-[#0a0a0a]/85 border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              : "bg-[#0a0a0a]/60 border-white/[0.06] shadow-none"
          }`}
        >
          {/* --- mouse-tracking glow --- */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(191,68,23,0.10), transparent 70%)`,
              opacity: 0.7,
            }}
          />

          <div className="relative flex items-center justify-between px-5 py-3 sm:px-6 sm:py-3.5">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#bf4417] via-[#ea580c] to-[#991b1b] text-white shadow-[0_0_14px_rgba(191,68,23,0.45)] group-hover:rotate-6 transition-transform duration-300">
                <span className="text-[11px] font-extrabold font-syne">SD</span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-[#0a0a0a] animate-pulse" />
                {/* orbiting dot */}
                <span className="absolute inset-[-4px] pointer-events-none">
                  <span
                    className="absolute left-1/2 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bf4417]"
                    style={{ animation: "navbar-orbit 3s linear infinite" }}
                  />
                </span>
              </span>
              <span className="text-lg font-bold font-syne tracking-tight text-white group-hover:text-[#ff8a5c] transition-colors">
                Shah{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] to-[#991b1b]">
                  Dhairya
                </span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={(e) => handleHashClick(e, link.path)}
                      className="group relative py-1"
                    >
                      <span
                        className={`text-xs font-medium transition-colors duration-200 ${
                          active
                            ? "text-[#bf4417]"
                            : "text-white/50 group-hover:text-white"
                        }`}
                      >
                        {link.name}
                      </span>
                      <span
                        className={`absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#bf4417] via-[#ea580c] to-[#991b1b] transition-all duration-300 ${
                          active ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>

              <a
                href="/Dhairya-Shah-Resume.pdf"
                download
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#bf4417] to-[#991b1b] hover:from-[#ea580c] hover:to-[#7f1d1d] px-4 py-2 text-xs font-medium text-white transition-all duration-300 shadow-[0_0_14px_rgba(191,68,23,0.35)] hover:shadow-[0_0_22px_rgba(191,68,23,0.55)] hover:-translate-y-0.5"
              >
                <FileText className="h-3.5 w-3.5 group-hover:animate-bounce" />
                <span>Resume</span>
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="md:hidden overflow-hidden border-t border-white/[0.06]"
              >
                <div className="px-5 pt-3 pb-4 flex flex-col gap-1">
                  {navLinks.map((link, i) => {
                    const active = isActive(link.path);
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.04, ease: EASE }}
                      >
                        <Link
                          to={link.path}
                          onClick={(e) => handleHashClick(e, link.path)}
                          className={`block py-2 text-sm font-medium transition-colors duration-200 ${
                            active
                              ? "text-[#bf4417]"
                              : "text-white/50 hover:text-white"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}

                  <div className="pt-3 mt-1 border-t border-white/[0.06]">
                    <a
                      href="/Dhairya-Shah-Resume.pdf"
                      download
                      className="group flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-[#bf4417] to-[#991b1b] hover:from-[#ea580c] hover:to-[#7f1d1d] py-2.5 text-xs font-medium text-white transition-all duration-300 shadow-[0_0_14px_rgba(191,68,23,0.35)]"
                    >
                      <FileText className="h-3.5 w-3.5 group-hover:animate-bounce" />
                      <span>Resume</span>
                    </a>
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
