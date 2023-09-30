import React, { useState } from 'react';
import './Card.css';

export const CardType = {
  FIRST: "first",
  SECOND: "second",
  THIRD: "third"
};

export function CardWrapper(props) {
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
}

export const Cards = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <div
        className={`card-${props.cardType} ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {props.cardType === CardType.FIRST && (
          <div>
            <div className='block-circle'></div>
            <div className='block-content'>
              <div>{props.icon}</div>
              <div className="card-title">{props.title}</div>
              <div className="card-text">{props.text}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
