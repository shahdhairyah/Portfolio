import { useRef } from "react";
import PropTypes from "prop-types";
import "./SpotlightCard.css";

const SpotlightCard = ({
  children,
  className = "",
  color = "rgba(234, 88, 12, 0.34)",
  size = 320,
  style,
}) => {
  const cardRef = useRef(null);

  const handleMove = (event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
    card.style.setProperty("--spotlight-opacity", "1");
  };

  const handleLeave = () => {
    cardRef.current?.style.setProperty("--spotlight-opacity", "0");
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`.trim()}
      style={{ "--spotlight-color": color, "--spotlight-size": `${size}px`, ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span className="spotlight-card__beam" aria-hidden="true" />
      <span className="spotlight-card__ring" aria-hidden="true" />
      <div className="spotlight-card__content">{children}</div>
    </div>
  );
};

SpotlightCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object,
};

export default SpotlightCard;
