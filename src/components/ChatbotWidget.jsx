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
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-semibold">$1</strong>')
    .replace(/`(.*?)`/g, '<code class="bg-muted/60 px-1 py-0.5 rounded text-[11px] font-mono text-gold">$1</code>')
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
    <div className="flex gap-2.5">
      <div className="shrink-0 mt-0.5">
        <div className="w-7 h-7 rounded-sm border border-hairline bg-surface flex items-center justify-center">
          <span className="font-display italic text-[11px] text-gold">D</span>
        </div>
      </div>
      <div className="flex-1 min-w-0 space-y-2.5">
        {data.title && <p className="text-[13px] font-bold text-foreground">{data.title}</p>}
        {data.body && (
          <p className="text-[13px] leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderMarkdown(data.body) }} />
        )}
        {data.body2 && (
          <p className="text-[13px] leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderMarkdown(data.body2) }} />
        )}
        {data.bullets && (
          <div className="space-y-1.5">
            {data.bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                <ChevronRight size={12} className="mt-1 shrink-0 text-primary" />
                <span dangerouslySetInnerHTML={{ __html: renderMarkdown(b) }} />
              </div>
            ))}
          </div>
        )}
        {data.sections &&
          data.sections.map((sec, i) => (
            <div key={i} className="space-y-1.5">
              <p className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider">{sec.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {sec.items.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-sm bg-surface border border-hairline-soft text-[11px] font-mono text-ink-muted">{t}</span>
                ))}
              </div>
            </div>
          ))}
        {data.tags && (
          <div className="flex flex-wrap gap-1.5">
            {data.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-muted/50 text-[11px] font-mono text-muted-foreground border border-border/40">{t}</span>
            ))}
          </div>
        )}
        {data.cards &&
          data.cards.map((c, i) => (
            <div key={i} className="p-3 rounded-sm bg-surface border border-hairline-soft">
              <p className="text-[13px] font-semibold text-foreground">{c.name}</p>
              {c.tech && <p className="text-[11px] text-primary font-mono mt-0.5">{c.tech}</p>}
              <p className="text-[12px] text-muted-foreground mt-1" dangerouslySetInnerHTML={{ __html: renderMarkdown(c.desc) }} />
            </div>
          ))}
        {data.stats && (
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center p-2 rounded-sm bg-surface border border-hairline-soft">
                <div className="text-base font-bold text-primary">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        {data.timeline && (
          <div className="space-y-2">
            {data.timeline.map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-[13px]">
                <span className="text-[11px] font-mono text-primary font-semibold w-10 shrink-0 text-right">{t.year}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span className="text-muted-foreground">{t.event}</span>
              </div>
            ))}
          </div>
        )}
        {data.contacts &&
          data.contacts.map((c, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[13px] py-0.5">
              <span className="text-muted-foreground text-[12px] w-20 shrink-0">{c.label}:</span>
              {c.href ? (
                <a href={c.href} className="text-primary font-medium hover:underline text-[13px] break-all">{c.value}</a>
              ) : (
                <span className="text-[13px]">{c.value}</span>
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-hairline-soft text-[12px] text-ink-muted hover:text-gold hover:border-gold transition-colors"
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-gold text-gold hover:bg-gold hover:text-bg transition-colors text-[13px] font-medium"
              >
                <ExternalLink size={12} /> {data.link.label}
              </a>
            )}
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-hairline-soft text-ink-muted hover:text-gold hover:border-gold transition-colors text-[13px] font-medium"
              >
                <Github size={12} /> GitHub
              </a>
            )}
          </div>
        )}
        {data.status && (
          <span className="inline-flex px-2.5 py-1 rounded-sm bg-gold/10 text-gold border border-gold/20 text-[11px] font-medium">
            {data.status}
          </span>
        )}
        {data.followUp && data.followUp.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {data.followUp.map((s) => (
              <button
                key={s}
                onClick={() => onSendRef.current(s)}
                className="px-2.5 py-1 rounded-sm border border-hairline-soft text-[11px] text-ink-muted hover:text-gold hover:border-gold transition-colors cursor-pointer"
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
    <div className="flex gap-2.5">
      <div className="shrink-0">
        <div className="w-7 h-7 rounded-sm border border-hairline bg-surface flex items-center justify-center">
          <span className="font-display italic text-[11px] text-gold">D</span>
        </div>
      </div>
      <div className="bg-surface border border-hairline-soft rounded-sm px-4 py-3">
        <div className="flex gap-1">
          {[0, 120, 240].map((d) => (
            <span key={d} className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
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
            body: `I'm **Dhairya's assistant**. I know everything about his work — skills, projects, achievements, experience, and more. Ask me anything or pick a topic below.`,
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
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] max-w-sm sm:max-w-[400px] bg-bg border border-hairline shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "min(80vh, 640px)" }}
          >
            <div className="relative bg-surface-2 border-b border-hairline-soft px-4 py-3.5 shrink-0">
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-gold origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-sm bg-bg border border-hairline flex items-center justify-center">
                    <span className="font-display italic text-sm text-gold">D</span>
                  </div>
                  <div>
                    <span className="font-display text-sm text-ink block leading-tight">Concierge</span>
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
                      </span>
                      At your service
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={reset} className="p-1.5 text-ink-muted hover:text-gold transition-colors" aria-label="Reset conversation" title="Reset">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={toggle} className="p-1.5 text-ink-muted hover:text-gold transition-colors" aria-label="Close">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3.5">
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                  {m.type === "user" ? (
                    <div className="flex justify-end">
                      <div className="max-w-[85%] bg-surface border border-hairline-soft text-ink text-[13px] rounded-sm px-3.5 py-2.5 leading-relaxed">{m.text}</div>
                    </div>
                  ) : (
                    <BotMessage data={m.data} />
                  )}
                </motion.div>
              ))}
              {typing && <TypingIndicator />}
            </div>

            <div className="shrink-0 border-t border-hairline-soft bg-bg px-3 py-2.5 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Dhairya..."
                className="flex-1 bg-transparent text-[13px] text-ink placeholder-ink-faint/50 outline-none px-2 py-1.5"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="p-2 rounded-sm bg-gold text-bg hover:bg-gold-bright transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                aria-label="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggle}
        className="fixed bottom-6 right-4 sm:right-6 z-[60] p-3.5 rounded-sm border border-gold bg-bg text-gold shadow-lg shadow-black/20 hover:bg-gold hover:text-bg transition-colors"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gold rounded-full border-2 border-bg">
            <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-40" />
          </span>
        )}
      </motion.button>
    </>
  );
}
