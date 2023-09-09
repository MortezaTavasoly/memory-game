import React from "react";
import "./SingleCard.css";

export default function SingleCard(props) {
  const handleClick = () => {
    if (!props.disable) {
      props.handleChoice(props.card);
    }
  };
  return (
    <div className="card">
      <div className={props.flipped ? "flipped" : ""}>
        <img src={props.card.src} alt="front" className="front" />
        <img
          src="./imgs/cover.png"
          alt="cover"
          className="back"
          onClick={() => {
            handleClick();
          }}
        />
      </div>
    </div>
  );
}
