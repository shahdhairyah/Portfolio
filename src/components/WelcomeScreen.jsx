import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const LINES = [
  "initializing portfolio...",
  "loading projects........ ✓",
  "loading experience...... ✓",
  "loading stack........... ✓",
  "establishing connection. ✓",
  "\nSYSTEM READY",
];

const T = {
  line: 260,
  hold: 350,
  fade: 400,
};

const WelcomeScreen = ({ onWelcomeComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const completed = useRef(false);

  const handleSkip = useCallback(() => {
    if (completed.current) return;
    setIsFading(true);
    setTimeout(() => {
      if (!completed.current) {
        completed.current = true;
        onWelcomeComplete();
      }
    }, 250);
  }, [onWelcomeComplete]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleSkip]);

  useEffect(() => {
    if (currentLine < LINES.length) {
      const timer = setTimeout(() => setCurrentLine((prev) => prev + 1), T.line);
      return () => clearTimeout(timer);
    }
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        if (!completed.current) {
          completed.current = true;
          onWelcomeComplete();
        }
      }, T.fade);
    }, T.hold);
    return () => clearTimeout(fadeTimer);
  }, [currentLine, onWelcomeComplete]);

  return (
    <motion.div
      className={`fixed inset-0 z-[200] bg-[#020202] text-emerald-400 font-mono flex items-center justify-center p-6 transition-opacity duration-400 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-white/70 hover:text-white transition-all cursor-pointer backdrop-blur-md"
      >
        <span>Skip</span>
        <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 border border-white/15 text-white/50">ESC</kbd>
      </button>

      <div className="w-full max-w-md space-y-2 text-sm sm:text-base">
        {LINES.slice(0, currentLine).map((line, index) => (
          <div key={index} className="whitespace-pre-wrap animate-fade-in">
            <span className="text-emerald-600 mr-2">&gt;</span>
            <span
              className={
                index === LINES.length - 1
                  ? "text-white font-bold tracking-wider"
                  : "text-emerald-400/90"
              }
            >
              {line}
            </span>
          </div>
        ))}
        {currentLine < LINES.length && (
          <div className="flex items-center gap-1">
            <span className="text-emerald-600">&gt;</span>
            <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

WelcomeScreen.propTypes = {
  onWelcomeComplete: PropTypes.func.isRequired,
};

export default WelcomeScreen;
