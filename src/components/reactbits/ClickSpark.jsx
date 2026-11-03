import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const ClickSpark = ({
  children,
  className = "",
  color = "#ea580c",
  count = 10,
  size = 14,
  radius = 30,
  duration = 500,
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduce) return undefined;

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    const frame = () => {
      rafRef.current = 0;
      const now = performance.now();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const particles = particlesRef.current;
      let alive = false;

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        const progress = (now - particle.start) / duration;
        if (progress >= 1) {
          particles.splice(i, 1);
          continue;
        }
        alive = true;
        const eased = 1 - Math.pow(1 - progress, 3);
        const distance = radius * eased;
        const length = size * (1 - progress);
        const x = particle.x + Math.cos(particle.angle) * distance;
        const y = particle.y + Math.sin(particle.angle) * distance;
        const x2 = x + Math.cos(particle.angle) * length;
        const y2 = y + Math.sin(particle.angle) * length;
        ctx.globalAlpha = 1 - progress;
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (alive) rafRef.current = requestAnimationFrame(frame);
    };

    const spawn = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      const burst = Array.from({ length: count }, (_, index) => ({
        x: event.clientX,
        y: event.clientY,
        angle: (index / count) * Math.PI * 2 + Math.random() * 0.35,
        start: performance.now(),
        color,
      }));
      particlesRef.current = [...particlesRef.current, ...burst].slice(-count * 4);
      if (!rafRef.current) rafRef.current = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", spawn, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", spawn);
    };
  }, [color, count, duration, radius, size]);

  return (
    <div className={className}>
      {children}
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true" />
    </div>
  );
};

ClickSpark.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  count: PropTypes.number,
  size: PropTypes.number,
  radius: PropTypes.number,
  duration: PropTypes.number,
};

export default ClickSpark;
