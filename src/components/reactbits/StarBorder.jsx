import PropTypes from "prop-types";
import "./StarBorder.css";

const StarBorder = ({
  as: Tag = "button",
  children,
  className = "",
  color = "#ea580c",
  backgroundColor = "#0a0a0a",
  textColor = "#ffffff",
  speed = 4,
  thickness = 1,
  radius = 14,
  style,
  ...props
}) => {
  const isButton = Tag === "button";
  return (
    <Tag
      className={`star-border ${className}`.trim()}
      style={{
        "--star-color": color,
        "--star-surface": backgroundColor,
        "--star-text": textColor,
        "--star-speed": `${speed}s`,
        "--star-thickness": `${thickness}px`,
        "--star-radius": `${radius}px`,
        ...style,
      }}
      {...(isButton && props.type === undefined ? { type: "button" } : null)}
      {...props}
    >
      <span className="star-border__track" aria-hidden="true" />
      <span className="star-border__surface" aria-hidden="true" />
      <span className="star-border__content">{children}</span>
    </Tag>
  );
};

StarBorder.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  speed: PropTypes.number,
  thickness: PropTypes.number,
  radius: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default StarBorder;
