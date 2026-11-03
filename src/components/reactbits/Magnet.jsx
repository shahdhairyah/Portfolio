import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import PropTypes from "prop-types";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const Magnet = ({
  children,
  className = "",
  padding = 90,
  strength = 0.28,
  maxOffset = 16,
  disabled = false,
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (disabled) return undefined;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduce) return undefined;

    const onMove = (event) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const inside =
        Math.abs(dx) < rect.width / 2 + padding && Math.abs(dy) < rect.height / 2 + padding;

      if (!inside) {
        x.set(0);
        y.set(0);
        return;
      }

      x.set(clamp(dx * strength, -maxOffset, maxOffset));
      y.set(clamp(dy * strength, -maxOffset, maxOffset));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [disabled, maxOffset, padding, strength, x, y]);

  return (
    <motion.div ref={ref} className={className} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
};

Magnet.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  padding: PropTypes.number,
  strength: PropTypes.number,
  maxOffset: PropTypes.number,
  disabled: PropTypes.bool,
};

export default Magnet;
