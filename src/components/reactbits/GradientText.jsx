import PropTypes from "prop-types";
import "./GradientText.css";

const GradientText = ({
  children,
  colors = ["#bf4417", "#ea580c", "#ffb26b", "#ea580c", "#bf4417"],
  speed = 8,
  className = "",
  glow = 0,
  style,
}) => {
  const palette = colors.length > 1 ? colors : [colors[0], colors[0]];

  return (
    <span
      className={`gradient-text ${className}`.trim()}
      style={{
        "--gradient-colors": palette.join(", "),
        "--gradient-speed": `${speed}s`,
        "--gradient-glow": glow,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

GradientText.propTypes = {
  children: PropTypes.node.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  speed: PropTypes.number,
  className: PropTypes.string,
  glow: PropTypes.number,
  style: PropTypes.object,
};

export default GradientText;
