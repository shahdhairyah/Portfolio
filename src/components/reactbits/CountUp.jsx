import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const format = (value, decimals, separator) => {
  const fixed = value.toFixed(decimals);
  if (!separator) return fixed;
  const [int, frac] = fixed.split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return frac ? `${grouped}.${frac}` : grouped;
};

const CountUp = ({
  to = 0,
  from = 0,
  duration = 1.8,
  decimals = 0,
  separator = "",
  prefix = "",
  suffix = "",
  className = "",
}) => {
  const ref = useRef(null);
  const [value, setValue] = useState(from);
  const playedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    if (reduce) {
      setValue(to);
      return undefined;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || playedRef.current) return;
        playedRef.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / (duration * 1000));
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(from + (to - from) * eased);
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [duration, from, to]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(value, decimals, separator)}
      {suffix}
    </span>
  );
};

CountUp.propTypes = {
  to: PropTypes.number,
  from: PropTypes.number,
  duration: PropTypes.number,
  decimals: PropTypes.number,
  separator: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  className: PropTypes.string,
};

export default CountUp;
