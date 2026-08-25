import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  Copy,
  Check,
  Mail,
  Phone,
  Zap,
  ChevronDown,
  Globe,
  Sparkles,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import ContactSection from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { identity } from "@/data/profile";
import { useToast } from "@/hooks/use-toast";

const EASE = [0.16, 1, 0.3, 1];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://shahdhairyah.in/" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://shahdhairyah.in/contact" },
  ],
};

const faqs = [
  {
    q: "What services do you offer?",
    a: "I offer full-stack web development, custom React frontend interfaces, backend API development (Node.js, PHP, Python), database architecture, and computer vision / gesture recognition web integrations.",
  },
  {
    q: "What is your typical turnaround time for a project?",
    a: "Project timelines depend on complexity. Small landing pages or quick feature implementations usually take 3–7 days, while full-stack web applications take 2–4 weeks. I maintain clear sprint updates throughout.",
  },
  {
    q: "Are you open for freelance work or full-time roles?",
    a: "Yes! I am actively available for freelance projects, technical contract work, and full-time software engineering roles.",
  },
  {
    q: "How do we get started on a new project?",
    a: "You can send me a message directly through the form below or on WhatsApp. We will schedule a quick initial call or chat to outline your goals, requirements, and technical roadmap.",
  },
  {
    q: "Do you work with clients internationally?",
    a: "Absolutely. I work remotely with clients and teams worldwide. I stay flexible with overlapping hours for different timezones.",
  },
];

const steps = [
  {
    num: "01",
    title: "Discovery & Alignment",
    desc: "We discuss your goals, project scope, requirements, and timeline to ensure we're aligned from day one.",
  },
  {
    num: "02",
    title: "Architecture & Design",
    desc: "I outline the system architecture, database schema, UI wireframes, and choose the optimal tech stack.",
  },
  {
    num: "03",
    title: "Sprint Development",
    desc: "Building feature by feature with clean code, responsive design, continuous updates, and milestone previews.",
  },
  {
    num: "04",
    title: "Launch & Support",
    desc: "Thorough testing, deployment to production, documentation handover, and ongoing post-launch support.",
  },
];

/* ─── Custom Header ─── */
const ContactHeader = () => (
  <section className="relative w-full flex min-h-[320px] flex-col items-center justify-center overflow-hidden bg-[#020202] px-6 py-20 md:min-h-[420px]">
    <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(#bf4417_0%,transparent_55%)] opacity-20 blur-[100px] md:w-[1100px]" />

    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative z-10 font-mono text-xs tracking-[0.08em] text-white/40 sm:text-sm"
    >
      <span className="text-emerald-400">➜</span>{" "}
      <span className="text-sky-400">~</span> echo{" "}
      <span className="text-white/30">$CONTACT_INFO</span>
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      className="relative z-10 mt-5 select-none text-center font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(3rem,10vw,8rem)]"
    >
      <span className="block text-white">Get In</span>
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#bf4417] via-amber-600 to-[#991b1b]">
        Touch
      </span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
      className="relative z-10 mt-6 max-w-lg text-center text-sm font-light leading-relaxed text-white/55 sm:text-base"
    >
      Let&apos;s create something extraordinary together. Reach out through any
      channel — I&apos;ll get back to you fast.
    </motion.p>
  </section>
);

export const Contact = () => {
  const { toast } = useToast();
  const [copiedField, setCopiedField] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast({
      title: "Copied to clipboard!",
      description: `${label} (${text}) copied successfully.`,
    });
    setTimeout(() => setCopiedField(null), 2500);
  };

  const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);

  return (
    <main className="relative w-full bg-[#020202] min-h-screen">
      <SEO
        title="Contact Shah Dhairya – Full-Stack Developer"
        description="Get in touch with Shah Dhairya for project collaborations, freelance work, or full-stack web development inquiries. Based in Gujarat, India."
        path="/contact"
        jsonLd={breadcrumbJsonLd}
      />

      <ContactHeader />

      {/* ─── Status Cards ─── */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 -mt-6 md:-mt-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Live Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="group p-6 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-[#bf4417]/40 hover:shadow-[0_0_30px_rgba(191,68,23,0.1)] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Work
              </span>
              <Globe size={18} className="text-white/40" />
            </div>
            <h3 className="text-lg font-bold text-white mt-2">Location & Status</h3>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Open for full-time roles, contracts & freelance projects globally.
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#bf4417]" />
                {identity.location}
              </span>
            </div>
          </motion.div>

          {/* Live Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="group p-6 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-[#bf4417]/40 hover:shadow-[0_0_30px_rgba(191,68,23,0.1)] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bf4417]/10 border border-[#bf4417]/30 text-[#bf4417] text-xs font-semibold uppercase tracking-wider">
                <Clock size={12} />
                Local Time (IST)
              </span>
              <Zap size={18} className="text-[#bf4417]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white mt-2 tracking-wider">
              {currentTime || "00:00:00 AM"}
            </div>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Gujarat, India (UTC +05:30)
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-amber-400" />
                Response Time: &lt; 2-4 days
              </span>
            </div>
          </motion.div>

          {/* Quick Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
            className="group p-6 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-[#bf4417]/40 hover:shadow-[0_0_30px_rgba(191,68,23,0.1)] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={12} />
                Direct Channels
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-2">Quick Copy</h3>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Copy contact credentials with a single click.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => handleCopy(identity.email, "Email")}
                className="w-full flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-xs text-white/90 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2 truncate">
                  <Mail size={13} className="text-[#bf4417] shrink-0" />
                  <span className="truncate">{identity.email}</span>
                </span>
                {copiedField === "Email" ? (
                  <Check size={14} className="text-emerald-400 shrink-0" />
                ) : (
                  <Copy size={14} className="text-white/40 shrink-0 hover:text-white" />
                )}
              </button>
              <button
                onClick={() => handleCopy(identity.phone, "Phone")}
                className="w-full flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-xs text-white/90 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2 truncate">
                  <Phone size={13} className="text-emerald-400 shrink-0" />
                  <span className="truncate">{identity.phone}</span>
                </span>
                {copiedField === "Phone" ? (
                  <Check size={14} className="text-emerald-400 shrink-0" />
                ) : (
                  <Copy size={14} className="text-white/40 shrink-0 hover:text-white" />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Let's Connect (UNCHANGED) ─── */}
      <ContactSection />

      {/* ─── Workflow ─── */}
      <section className="relative w-full max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:54px_54px] pointer-events-none" />
        <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[500px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[120px]" />

        <div className="relative z-10 text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#bf4417]/30 text-[#bf4417] text-xs font-semibold uppercase tracking-[0.18em]"
          >
            <Sparkles size={13} />
            Collaboration Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mt-4 text-3xl sm:text-5xl font-extrabold font-syne tracking-tight text-white"
          >
            How We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a4d] via-[#ea580c] to-[#991b1b]">
              Work Together
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
            className="text-white/50 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed mt-3"
          >
            A structured, transparent engineering process focused on clarity, performance, and timely delivery.
          </motion.p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="group relative p-6 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-[#bf4417]/50 hover:shadow-[0_0_30px_rgba(191,68,23,0.1)] transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-3xl font-extrabold font-mono text-white/[0.06] group-hover:text-[#bf4417]/20 transition-colors">
                {step.num}
              </div>
              <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-[#bf4417] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="w-10 h-10 rounded-xl bg-[#bf4417]/10 border border-[#bf4417]/30 flex items-center justify-center text-[#bf4417] mb-4 group-hover:scale-110 transition-transform">
                <span className="font-display font-bold text-sm">{step.num}</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#ff9a4d] transition-colors">
                {step.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/50 font-light leading-relaxed">
                {step.desc}
              </p>
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center text-xs font-medium text-[#bf4417]">
                Step {step.num} <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="relative w-full max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[500px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] opacity-10 blur-[120px]" />

        <div className="relative z-10 text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#bf4417]/30 text-[#bf4417] text-xs font-semibold uppercase tracking-[0.18em]"
          >
            <Sparkles size={13} />
            Got Questions?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mt-4 text-3xl sm:text-4xl font-extrabold font-syne tracking-tight text-white"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
            className="text-white/50 text-sm max-w-lg mx-auto font-light leading-relaxed mt-2"
          >
            Everything you need to know before starting a collaboration.
          </motion.p>
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE }}
                className={`bg-white/[0.03] rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-[#bf4417]/40 shadow-[0_0_20px_rgba(191,68,23,0.08)]" : "border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#bf4417]">0{idx + 1}.</span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-white/50 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#bf4417]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-white/55 font-light leading-relaxed border-t border-white/5 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="relative w-full max-w-5xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden text-center flex flex-col items-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[radial-gradient(#bf4417_0%,transparent_70%)] blur-[80px] opacity-20 pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to bring your ideas to life?
            </h3>
            <p className="mt-3 text-white/55 text-xs sm:text-sm font-light leading-relaxed">
              Whether you have a specific inquiry or just want to explore opportunities, feel free to send a message or start a conversation.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${identity.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#bf4417] to-[#991b1b] hover:from-[#ea580c] hover:to-[#7f1d1d] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(191,68,23,0.3)] hover:shadow-[0_0_30px_rgba(191,68,23,0.5)] hover:-translate-y-0.5"
              >
                <Mail size={15} />
                <span>Send an Email</span>
              </a>
              <a
                href={`https://wa.me/${identity.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-0.5"
              >
                <MessageSquare size={15} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Contact;
