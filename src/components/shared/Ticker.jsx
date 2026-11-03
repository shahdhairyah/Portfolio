import PropTypes from "prop-types";

const DEFAULT_WORDS = [
  "React", "PHP", "Python", "Node.js", "MySQL",
  "Tailwind CSS", "REST APIs", "Git", "GitHub", "Vite",
];

const Ticker = ({ words = DEFAULT_WORDS, reverse = false, className = "" }) => {
  const items = [...words, ...words];
  const loop = [...items, ...items];

  return (
    <div
      className={`overflow-hidden border-y border-white/[0.04] py-3.5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className={`flex w-max gap-8 ${
          reverse ? "animate-marquee-right" : "animate-marquee-left"
        }`}
      >
        {loop.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-8 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em]"
          >
            <span className="text-white/15 transition-colors hover:text-[#bf4417]">
              {word}
            </span>
            <span className="text-[#bf4417]/25">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

Ticker.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string),
  reverse: PropTypes.bool,
  className: PropTypes.string,
};

export default Ticker;
