import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
const cardImages = [
  { src: "./imgs/1.png", matched: false },
  { src: "./imgs/2.png", matched: false },
  { src: "./imgs/3.png", matched: false },
  { src: "./imgs/4.png", matched: false },
  { src: "./imgs/5.png", matched: false },
  { src: "./imgs/6.png", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [ChoiceOne, setChoiceOne] = useState(null);
  const [ChoiceTwo, setChoiceTwo] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [disable, setDisable] = useState(false);
  const [turns, setTurns] = useState(0);

  const handleChoice = (card) => {
    ChoiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    if (ChoiceOne && ChoiceTwo) {
      setDisable(true);
      if (ChoiceOne.src === ChoiceTwo.src) {
        setTurns((prev) => prev + 1);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === ChoiceOne.src) {
              resetAll();
              setFlipped(true);
              return { ...card, matched: true };
            } else {
              resetAll();
              return card;
            }
          });
        });
      } else {
        setTurns((prev) => prev + 1);
        setTimeout(() => {
          resetAll();
        }, 1000);
      }
    }
  }, [ChoiceOne, ChoiceTwo]);

  const resetAll = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setFlipped(false);
    setDisable(false);
  };
  const suffleCards = () => {
    setTurns(0);
    const cardsSuffled = [...cardImages, ...cardImages]
      .map((card) => {
        return { ...card, id: Math.random() };
      })
      .sort(() => Math.random() - 0.5);
    setCards(cardsSuffled);
  };
  console.log(cards);
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={() => suffleCards()}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => {
          return (
            <SingleCard
              disable={disable}
              card={card}
              handleChoice={handleChoice}
              flipped={card === ChoiceOne || card === ChoiceTwo || card.matched}
            />
          );
        })}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
