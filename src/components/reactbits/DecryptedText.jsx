import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>[]{}";

const DecryptedText = ({
  text = "",
  className = "",
  animateOn = "view",
  once = true,
  loop = false,
}) => {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const timerRef = useRef(0);
  const playedRef = useRef(false);
  const nodeRef = useRef(null);

  const run = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    clearTimeout(timerRef.current);
    let iteration = 0;

    const tick = () => {
      const next = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setDisplay(next);
      iteration += 0.55;
      if (iteration <= text.length) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        if (loop) {
          timerRef.current = window.setTimeout(run, 2600);
        }
      }
    };

    tick();
  }, [text, loop]);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return undefined;

    if (animateOn === "view") {
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
      if (reduce) {
        setDisplay(text);
        return undefined;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          if (!playedRef.current) {
            playedRef.current = true;
            run();
          }
          if (!once) observer.disconnect();
        },
        { threshold: 0.4 }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }

    if (animateOn === "load") {
      setDisplay(text);
      run();
    }

    return () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timerRef.current);
    };
  }, [animateOn, once, run, text]);

  useEffect(
    () => () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timerRef.current);
    },
    []
  );

  const handleEnter = () => {
    if (animateOn === "hover") run();
  };

  return (
    <span
      ref={nodeRef}
      className={className}
      onMouseEnter={handleEnter}
      onFocus={handleEnter}
      tabIndex={animateOn === "hover" ? 0 : undefined}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="whitespace-pre-wrap">
        {display}
      </span>
    </span>
  );
};

DecryptedText.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  animateOn: PropTypes.oneOf(["view", "hover", "load"]),
  once: PropTypes.bool,
  loop: PropTypes.bool,
};

export default DecryptedText;
