import React, { useState, useEffect, useCallback } from 'react';
import './Stylesheet/App.css';
import { Card } from './Components/Card';
import Modal from "react-modal"


const initialImages = [
  {id:require('./Assets/corgi.jpg')},
  {id:require('./Assets/husky.jpg')},
  {id:require('./Assets/chihuahua.jpg')},
  {id:require('./Assets/dash.jpg')},
  {id:require('./Assets/doge.jpg')},
  {id:require('./Assets/dash2.jpg')},
  {id:require('./Assets/lab.jpg')},
  {id:require('./Assets/pomarian.jpg')},
  {id:require('./Assets/pug.jpg')},
  {id:require('./Assets/rot.jpg')},
];

const initialNumbers = [{id:"1"},{id:"2"},{id:"3"},{id:"4"},{id:"5"},{id:"6"},{id:"7"},{id:"8"},{id:"9"},{id:"0"},];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [useNumbers, setUseNumbers] = useState(false);

  console.log(flippedCards,"Matche",matchedCards)

  const initializeGame = useCallback(() => {
    const initialSet = useNumbers ? initialNumbers : initialImages;
    const shuffledCards = shuffleArray([...initialSet, ...initialSet]);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
  }, [useNumbers]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleFlip = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const handleSwitch = () => {
    setUseNumbers((prevUseNumbers) => !prevUseNumbers);
  };

  const handlePlayAgain = () => {
    initializeGame();
  };

  const allMatched = matchedCards.length === cards.length;

  const appClassName = useNumbers ? 'App numbers-background' : 'App images-background';

  return (
    <div className={appClassName}>
      <div className='header'>
        <button className="switch-button" onClick={handleSwitch}>
          {useNumbers ? 'Switch to Images' : 'Switch to Numbers'}
        </button>
        <h1 className='heading'>Brainstrom</h1>
      </div>
      <div className="grid">
        {cards.map((card, index) => (
          <Card
            key={index}
            index={index}
            card={card}
            isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
            onFlip={() => handleFlip(index)}
            useNumbers={useNumbers}
          />
        ))}
      </div>
      {allMatched && (
        <Modal isOpen={allMatched} className={"modal"} overlayClassName={"overlay"}>
            <div className="play-again">
              <button onClick={handlePlayAgain}>Play Again !</button>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default App;