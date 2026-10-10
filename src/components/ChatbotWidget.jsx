import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Send, RefreshCw, ChevronRight, ExternalLink,
  Github, Globe,
} from "lucide-react";
import { QUICK_TOPICS, KB, FALLBACK } from "@/data/chatContext";

function renderMarkdown(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-[11px] font-mono text-[#ff9a4d]">$1</code>')
    .replace(/\n{2,}/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}

function matchTopic(input) {
  const lower = input.toLowerCase().trim();
  let best = null;
  let bestScore = 0;
  for (const entry of KB) {
    let score = 0;
    for (const kw of entry.keywords) {
      const idx = lower.indexOf(kw);
      if (idx === 0) score += kw.length * 2;
      else if (idx > 0) score += kw.length;
      else {
        const words = kw.split(" ");
        score += words.filter((w) => w.length > 2 && lower.includes(w)).length * 3;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore >= 3 ? best : null;
}

function BotMessage({ data }) {
  return (
    <div className="flex gap-2.5 items-start">
      <div className="shrink-0 mt-0.5">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#bf4417] to-[#991b1b] flex items-center justify-center shadow-[0_0_10px_rgba(191,68,23,0.4)]">
          <span className="font-syne font-bold text-[11px] text-white">SD</span>
        </div>
      </div>
      <div className="flex-1 min-w-0 space-y-2.5 bg-white/[0.04] border border-white/10 rounded-2xl rounded-tl-sm p-3.5">
        {data.title && <p className="text-[13px] font-bold text-white tracking-tight">{data.title}</p>}
        {data.body && (
          <p className="text-[13px] leading-relaxed text-white/70" dangerouslySetInnerHTML={{ __html: renderMarkdown(data.body) }} />
        )}
        {data.body2 && (
          <p className="text-[13px] leading-relaxed text-white/70" dangerouslySetInnerHTML={{ __html: renderMarkdown(data.body2) }} />
        )}
        {data.bullets && (
          <div className="space-y-1.5">
            {data.bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-[13px] text-white/75">
                <ChevronRight size={13} className="mt-1 shrink-0 text-[#ff8a5c]" />
                <span dangerouslySetInnerHTML={{ __html: renderMarkdown(b) }} />
              </div>
            ))}
          </div>
        )}
        {data.sections &&
          data.sections.map((sec, i) => (
            <div key={i} className="space-y-1.5 pt-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#ff9a4d]">{sec.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {sec.items.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-white/70">{t}</span>
                ))}
              </div>
            </div>
          ))}
        {data.tags && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {data.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-lg bg-white/5 text-[11px] font-mono text-white/60 border border-white/10">{t}</span>
            ))}
          </div>
        )}
        {data.cards &&
          data.cards.map((c, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <p className="text-[13px] font-semibold text-white">{c.name}</p>
              {c.tech && <p className="text-[11px] text-[#ff9a4d] font-mono mt-0.5">{c.tech}</p>}
              <p className="text-[12px] text-white/60 mt-1" dangerouslySetInnerHTML={{ __html: renderMarkdown(c.desc) }} />
            </div>
          ))}
        {data.stats && (
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 pt-1">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center p-2 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-sm font-bold text-[#ff9a4d]">{s.value}</div>
                <div className="text-[9px] uppercase tracking-wider text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        {data.timeline && (
          <div className="space-y-2 pt-1">
            {data.timeline.map((t, i) => (
              <div key={i} className="flex items-center gap-2.5 text-[12px]">
                <span className="text-[11px] font-mono text-[#ff9a4d] font-semibold w-10 shrink-0 text-right">{t.year}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#bf4417]" />
                <span className="text-white/70">{t.event}</span>
              </div>
            ))}
          </div>
        )}
        {data.contacts &&
          data.contacts.map((c, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[13px] py-0.5">
              <span className="text-white/45 text-[12px] w-20 shrink-0">{c.label}:</span>
              {c.href ? (
                <a href={c.href} className="text-[#ff9a4d] hover:underline text-[13px] break-all">{c.value}</a>
              ) : (
                <span className="text-[13px] text-white/80">{c.value}</span>
              )}
            </div>
          ))}
        {data.socials && (
          <div className="flex flex-wrap gap-2 pt-1">
            {data.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-[12px] text-white/70 hover:text-white hover:border-[#bf4417]/50 transition-colors"
              >
                <Globe size={12} /> {s.label}
              </a>
            ))}
          </div>
        )}
        {(data.link || data.github) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {data.link && (
              <a
                href={data.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#bf4417]/40 bg-[#bf4417]/10 text-[#ff9a4d] hover:bg-[#bf4417] hover:text-white transition-colors text-[12px] font-medium"
              >
                <ExternalLink size={12} /> {data.link.label}
              </a>
            )}
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/20 transition-colors text-[12px] font-medium"
              >
                <Github size={12} /> GitHub
              </a>
            )}
          </div>
        )}
        {data.status && (
          <span className="inline-flex px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-medium">
            {data.status}
          </span>
        )}
        {data.followUp && data.followUp.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {data.followUp.map((s) => (
              <button
                key={s}
                onClick={() => onSendRef.current(s)}
                className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-[11px] text-white/70 hover:text-white hover:border-[#bf4417]/60 hover:bg-[#bf4417]/10 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

BotMessage.propTypes = {
  data: PropTypes.object,
};

const onSendRef = { current: null };

function TypingIndicator() {
  return (
    <div className="flex gap-2.5 items-center">
      <div className="shrink-0">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#bf4417] to-[#991b1b] flex items-center justify-center">
          <span className="font-syne font-bold text-[11px] text-white">SD</span>
        </div>
      </div>
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 150, 300].map((d) => (
            <span key={d} className="w-1.5 h-1.5 bg-[#ff9a4d] rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const greeted = useRef(false);
  const idRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true;
      setMessages([
        {
          id: ++idRef.current,
          type: "bot",
          data: {
            title: "Hey there! 👋",
            body: `I'm **Dhairya's AI assistant**. I know everything about his work — skills, projects, achievements, and experience. Ask me anything or choose a topic below.`,
            followUp: QUICK_TOPICS.map((t) => t.label),
          },
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = useCallback((text) => {
    const msg = typeof text === "string" ? text.trim() : "";
    if (!msg) return;
    setInput("");
    setMessages((p) => [...p, { id: ++idRef.current, type: "user", text: msg }]);
    setTyping(true);

    setTimeout(() => {
      const clean = msg.replace(/^[\d\s.]+/, "").replace(/^\p{Emoji}+/u, "").trim();
      const topic = matchTopic(clean);
      const data = topic ? { ...topic } : { ...FALLBACK };
      setMessages((p) => [...p, { id: ++idRef.current, type: "bot", data }]);
      setTyping(false);
    }, 400 + Math.random() * 300);
  }, []);

  onSendRef.current = sendMessage;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const toggle = () => {
    if (open) {
      greeted.current = false;
      setMessages([]);
    }
    setOpen((p) => !p);
  };

  const reset = () => {
    greeted.current = false;
    setMessages([]);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] max-w-sm sm:max-w-[420px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "min(80vh, 640px)" }}
          >
            <div             className="relative bg-white/[0.02] border-b border-white/10 px-4 py-3.5 shrink-0 backdrop-blur-xl">
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#bf4417] via-[#ea580c] to-[#991b1b] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#bf4417] via-[#ea580c] to-[#991b1b] flex items-center justify-center shadow-[0_0_12px_rgba(191,68,23,0.45)]">
                    <span className="font-syne font-bold text-xs text-white">SD</span>
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm text-white block leading-tight">Dhairya&apos;s Assistant</span>
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-400 font-medium">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                      </span>
                      Online &amp; Ready
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={reset} className="p-1.5 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5" aria-label="Reset conversation" title="Reset">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={toggle} className="p-1.5 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5" aria-label="Close">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5">
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                  {m.type === "user" ? (
                    <div className="flex justify-end">
                      <div className="max-w-[85%] bg-[#bf4417]/20 border border-[#bf4417]/40 text-white text-[13px] rounded-2xl rounded-tr-sm px-4 py-2.5 leading-relaxed shadow-md backdrop-blur-sm">
                        {m.text}
                      </div>
                    </div>
                  ) : (
                    <BotMessage data={m.data} />
                  )}
                </motion.div>
              ))}
              {typing && <TypingIndicator />}
            </div>

            <div className="shrink-0 border-t border-white/10 bg-white/[0.02] px-3 py-3 flex items-center gap-2 backdrop-blur-xl">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about projects, skills, contact..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl text-[13px] text-white placeholder-white/35 outline-none px-3 py-2 focus:border-[#bf4417] transition-colors"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#bf4417] to-[#991b1b] text-white hover:from-[#ea580c] hover:to-[#7f1d1d] transition-all shadow-[0_0_15px_rgba(191,68,23,0.3)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggle}
        className="fixed bottom-6 right-4 sm:right-6 z-[60] flex items-center justify-center w-12 h-12 rounded-full border border-[#bf4417]/60 bg-gradient-to-br from-[#1e0e09] via-[#0a0a0a] to-[#050505] text-[#ff9a4d] shadow-[0_0_40px_rgba(191,68,23,0.45)] hover:border-[#bf4417] hover:shadow-[0_0_60px_rgba(191,68,23,0.6)] transition-all cursor-pointer backdrop-blur-xl"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="w-5 h-5 text-white" /> : <MessageCircle className="w-5 h-5" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0c0c0c]">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
          </span>
        )}
      </motion.button>
    </>
  );
}
