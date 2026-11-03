import { motion } from "framer-motion";
import PropTypes from "prop-types";

const EASE = [0.16, 1, 0.3, 1];

const BlurText = ({
  text = "",
  as: Tag = "span",
  className = "",
  delay = 70,
  duration = 0.7,
  blur = 12,
  distance = 24,
  trigger = "view",
  once = true,
  style,
}) => {
  const words = text.split(" ");
  const animation = {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
  };
  const initial = {
    opacity: 0,
    filter: `blur(${blur}px)`,
    y: distance,
  };
  const motionProps =
    trigger === "load"
      ? { animate: animation }
      : { whileInView: animation, viewport: { once, margin: "-50px" } };

  return (
    <Tag className={className} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block will-change-[transform,filter,opacity]"
            initial={initial}
            {...motionProps}
            transition={{
              duration,
              delay: (index * delay) / 1000,
              ease: EASE,
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
};

BlurText.propTypes = {
  text: PropTypes.string,
  as: PropTypes.elementType,
  className: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  blur: PropTypes.number,
  distance: PropTypes.number,
  trigger: PropTypes.oneOf(["view", "load"]),
  once: PropTypes.bool,
  style: PropTypes.object,
};

export default BlurText;
