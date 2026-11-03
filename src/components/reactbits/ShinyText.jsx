import PropTypes from "prop-types";
import "./ShinyText.css";

const ShinyText = ({
  text,
  children,
  className = "",
  color = "#8b8b8b",
  shineColor = "#ffffff",
  speed = 3,
  glow = 0,
  style,
}) => {
  const content = children ?? text;

  return (
    <span
      className={`shiny-text ${glow > 0 ? "shiny-text--glow" : ""} ${className}`.trim()}
      style={{
        "--shiny-color": color,
        "--shiny-highlight": shineColor,
        "--shiny-speed": `${speed}s`,
        "--shiny-glow": glow,
        ...style,
      }}
    >
      {content}
    </span>
  );
};

ShinyText.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  shineColor: PropTypes.string,
  speed: PropTypes.number,
  glow: PropTypes.number,
  style: PropTypes.object,
};

export default ShinyText;
