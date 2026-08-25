import { Link } from "react-router-dom";
import {
  Mail,
  MessageSquare,
  ArrowUpRight,
  Code2,
  ArrowUp,
} from "lucide-react";
import { identity, socials } from "@/data/profile";
import PropTypes from "prop-types";

const Github = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const Linkedin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

Github.propTypes = { size: PropTypes.number };
Linkedin.propTypes = { size: PropTypes.number };

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Achievements", path: "/achievements" },
  { name: "Contact", path: "/contact" },
];

const waNumber = identity.phone.replace(/[^0-9]/g, "");

export const Footer = () => {
  const year = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full bg-[#020202] text-white border-t border-white/10 overflow-hidden font-inter">
      {/* Grid background */}
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />

      {/* Giant watermark */}
      <div aria-hidden className="pointer-events-none select-none absolute inset-0 flex items-center justify-center">
        <span className="block text-center font-display font-extrabold leading-[0.85] text-[15vw] md:text-[10rem] text-transparent [-webkit-text-stroke:3px_rgba(191,68,23,0.25)] whitespace-nowrap">
          <span className="block">SHAH</span>
          <span className="block">DHAIRYA</span>
        </span>
      </div>

      {/* Orange glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] blur-[100px] opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10 px-6">
        {/* ─── Compact CTA Banner ─── */}
        <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 px-6 py-6 md:px-10 md:py-8 mt-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#bf4417]/50 to-transparent" />
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[radial-gradient(#bf4417_0%,transparent_70%)] blur-[60px] opacity-20 pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#bf4417] border border-[#bf4417]/30 bg-[#bf4417]/10 px-3 py-1 rounded-md">
                <Code2 size={13} />
                Open for work
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-extrabold font-syne tracking-tight">
                Have an idea?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a4d] via-[#ea580c] to-[#991b1b]">
                  Let&apos;s build it.
                </span>
              </h2>
            </div>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#bf4417] to-[#991b1b] hover:from-[#ea580c] hover:to-[#7f1d1d] hover:shadow-[0_0_30px_rgba(191,68,23,0.5)] transition-all duration-300 shrink-0"
            >
              Let&apos;s Talk
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* ─── Main Grid — compact ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-10 pb-8">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold font-syne text-white tracking-tight">Shah Dhairya</span>
              <span className="w-2 h-2 rounded-full bg-[#c2410c] animate-pulse" />
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm font-light">
              Full-Stack Developer &amp; Digital Architect building performant web apps with React, PHP, Python, and Node.js.
            </p>
            <div className="flex items-center gap-2 pt-0.5">
              {[Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href={socials[i]?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socials[i]?.label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
              <a
                href={`mailto:${identity.email}`}
                aria-label="Email"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-[#bf4417] hover:bg-[#bf4417]/10 hover:border-[#bf4417]/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Mail size={16} />
              </a>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageSquare size={16} />
              </a>
            </div>
          </div>

          {/* ─── Navigation — Creative Horizontal Grid ─── */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 font-syne mb-3">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((l, i) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className="group relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#bf4417]/30 hover:bg-[#bf4417]/[0.06] transition-all duration-300 overflow-hidden"
                >
                  {/* Hover glow line */}
                  <span className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#bf4417] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="flex items-center justify-center w-7 h-7 rounded-md bg-white/[0.05] border border-white/[0.08] group-hover:bg-[#bf4417]/15 group-hover:border-[#bf4417]/30 text-[10px] font-mono font-bold text-white/25 group-hover:text-[#bf4417] transition-all duration-300 shrink-0">
                    0{i + 1}
                  </span>
                  <span className="text-sm font-medium text-white/50 group-hover:text-white transition-colors duration-300 truncate">
                    {l.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Cards — compact */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 font-syne">
              Get in Touch
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { label: "Email", value: identity.email, href: `mailto:${identity.email}`, icon: Mail, color: "text-[#bf4417]", bg: "bg-[#bf4417]/10 border-[#bf4417]/30", hover: "hover:border-[#bf4417]/40" },
                { label: "WhatsApp", value: identity.phone, href: `https://wa.me/${waNumber}`, icon: MessageSquare, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", hover: "hover:border-emerald-400/40" },
                { label: "GitHub", value: "github.com/shahdhairyah", href: socials[0]?.href, icon: Github, color: "text-white/70", bg: "bg-white/5 border-white/10", hover: "hover:border-white/30" },
                { label: "LinkedIn", value: "Dhairya Shah", href: socials[1]?.href, icon: Linkedin, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", hover: "hover:border-blue-400/40" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group flex items-center gap-3 p-2.5 bg-white/[0.03] rounded-xl border border-white/10 ${c.hover} hover:bg-white/[0.06] transition-all duration-200`}
                >
                  <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${c.bg} ${c.color} shrink-0`}>
                    <c.icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-white/30">{c.label}</div>
                    <div className="text-xs font-medium text-white/70 truncate">{c.value}</div>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#bf4417] transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="border-t border-white/10" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35 pt-4 pb-6">
          <p>© {year} Shah Dhairya. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#bf4417]/40 hover:text-[#bf4417] font-medium transition-all duration-200"
          >
            Back to top
            <ArrowUp size={12} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
