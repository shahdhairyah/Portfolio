import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Aurora.css";

const Aurora = ({
  colorStops = ["#bf4417", "#ea580c", "#7f1d1d"],
  speed = 0.7,
  amplitude = 1,
  opacity = 0.75,
  className = "",
  style,
}) => {
  const canvasRef = useRef(null);
  const settingsRef = useRef({ colorStops, speed, amplitude, opacity });
  settingsRef.current = { colorStops, speed, amplitude, opacity };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const blobs = [
      { x: 0.22, y: 0.45, r: 0.72, s: 0.17, p: 0.0, i: 0 },
      { x: 0.78, y: 0.35, r: 0.66, s: 0.21, p: 1.9, i: 1 },
      { x: 0.52, y: 0.78, r: 0.82, s: 0.13, p: 3.7, i: 2 },
      { x: 0.86, y: 0.72, r: 0.48, s: 0.25, p: 5.1, i: 0 },
    ];
    let raf = 0;
    let visible = true;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    const draw = (now) => {
      const s = settingsRef.current;
      const t = reduce ? 0 : ((now - start) / 1000) * s.speed;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "lighter";

      blobs.forEach((blob) => {
        const cx = width * (blob.x + Math.sin(t * blob.s + blob.p) * 0.14 * s.amplitude);
        const cy = height * (blob.y + Math.cos(t * blob.s * 1.2 + blob.p) * 0.11 * s.amplitude);
        const radius = Math.max(width, height) * blob.r * (1 + Math.sin(t * blob.s * 0.8 + blob.p) * 0.08);
        const color = s.colorStops[blob.i % Math.max(1, s.colorStops.length)] || "#bf4417";
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.35, color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = 0.16 * s.opacity;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = (now) => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(now);
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(frame);
    };

    const observer = new ResizeObserver(() => {
      resize();
      draw(performance.now());
      wake();
    });
    observer.observe(canvas);

    const intersection = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) wake();
    });
    intersection.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        start = performance.now();
        wake();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    resize();
    draw(performance.now());
    wake();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      className={`aurora ${className}`.trim()}
      style={{ "--aurora-opacity": opacity, ...style }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="aurora__canvas" />
    </div>
  );
};

Aurora.propTypes = {
  colorStops: PropTypes.arrayOf(PropTypes.string),
  speed: PropTypes.number,
  amplitude: PropTypes.number,
  opacity: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Aurora;
