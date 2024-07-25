import React from 'react';
import '../Stylesheet/Card.css';

export const Card=({index,card,isFlipped,onFlip,useNumbers})=>{
return(
  <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
  <div className="card-front">
    {useNumbers ? (
      <div className="number">{card.id}</div>
    ) : (
      <img src={card.id} alt="card front" />
    )}
  </div>
  <div className="card-back" />
</div>
)}