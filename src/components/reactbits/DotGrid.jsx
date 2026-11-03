import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./DotGrid.css";

const DotGrid = ({
  className = "",
  dotSize = 2,
  gap = 26,
  radius = 150,
  baseColor = "rgba(255, 255, 255, 0.14)",
  activeColor = "#ea580c",
  style,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const pointer = { x: -9999, y: -9999, active: false };
    let dots = [];
    let width = 1;
    let height = 1;
    let dpr = 1;
    let raf = 0;
    let visible = true;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      dots = [];
      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          dots.push({ x, y, ox: 0, oy: 0, energy: 0 });
        }
      }
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        let targetX = 0;
        let targetY = 0;
        let energy = 0;
        if (pointer.active && !reduce) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < radius && distance > 0.01) {
            const falloff = 1 - distance / radius;
            energy = falloff * falloff;
            targetX = (dx / distance) * 18 * energy;
            targetY = (dy / distance) * 18 * energy;
          }
        }
        dot.ox += (targetX - dot.ox) * 0.16;
        dot.oy += (targetY - dot.oy) * 0.16;
        dot.energy += (energy - dot.energy) * 0.12;
        const size = dotSize + dot.energy * 2.4;
        const alpha = 0.12 + dot.energy * 0.7;
        ctx.beginPath();
        ctx.arc(dot.x + dot.ox, dot.y + dot.oy, size, 0, Math.PI * 2);
        ctx.fillStyle = dot.energy > 0.02 ? activeColor : baseColor;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const frame = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw();
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(frame);
    };

    const locate = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
      wake();
    };
    const onLeave = () => {
      pointer.active = false;
      wake();
    };

    const resizeObserver = new ResizeObserver(() => {
      build();
      draw();
      wake();
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) wake();
    });
    intersection.observe(canvas);

    window.addEventListener("pointermove", locate, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    build();
    draw();
    wake();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", locate);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [activeColor, baseColor, dotSize, gap, radius]);

  return (
    <div className={`dot-grid ${className}`.trim()} style={style} aria-hidden="true">
      <canvas ref={canvasRef} className="dot-grid__canvas" />
    </div>
  );
};

DotGrid.propTypes = {
  className: PropTypes.string,
  dotSize: PropTypes.number,
  gap: PropTypes.number,
  radius: PropTypes.number,
  baseColor: PropTypes.string,
  activeColor: PropTypes.string,
  style: PropTypes.object,
};

export default DotGrid;
