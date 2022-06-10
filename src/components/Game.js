import React from "react";
import Card from "./Card";
import MovesCounter from "./MovesCounter";
import Stopwatch from "./Stopwatch";
import "./game.scss";

const Game = (props) => {
    //creates card's array with duplicated numbers based on chosen grid size

    const createCards = () => {
        const cardsNumbers = [];
        for (let i = 1; i <= props.gridSize; i++) {
            cardsNumbers.push(i);
        }
        return [...cardsNumbers, ...cardsNumbers];
    };

    // shuflle the cards array and add default object keys: values
    const shuffleCards = () => {
        const shuffledCards = createCards()
            .sort(() => Math.random() - 0.5)
            .map((card) => ({
                value: card,
                id: Math.random(),
                isFlipped: false,
                isMatched: false,
                disabled: false,
            }));

        return shuffledCards;
    };

    const [cards, setCards] = React.useState(() => shuffleCards());
    const [firstFlipped, setFirstFlipped] = React.useState();
    const [secondFlipped, setSecondFlipped] = React.useState();
    const [movesCounter, setMovesCounter] = React.useState(0);

    //check if game starter for Stopwatch

    const playerStartedGame = firstFlipped || movesCounter;

    // assign the cards value to state

    const handleClick = (value, id) => {
        firstFlipped
            ? setSecondFlipped({ value, id })
            : setFirstFlipped({ value, id });
    };

    // managing cards selection

    React.useEffect(() => {
        if (secondFlipped && firstFlipped.value === secondFlipped.value) {
            setCards((prevCards) => {
                return prevCards.map((card) => {
                    return card.value === secondFlipped.value
                        ? {
                              ...card,
                              isMatched: true,
                          }
                        : card;
                });
            });
            setMovesCounter((prevMovesCounter) => prevMovesCounter + 1);
            resetFlipped();
        } else if (firstFlipped && !secondFlipped) {
            setCards((prevCards) => {
                return prevCards.map((card) => {
                    return card.id === firstFlipped.id
                        ? {
                              ...card,
                              isFlipped: true,
                          }
                        : card;
                });
            });
        } else if (firstFlipped && secondFlipped) {
            setCards((prevCards) => {
                return prevCards.map((card) => {
                    return card.id === secondFlipped.id
                        ? {
                              ...card,
                              isFlipped: true,
                          }
                        : card;
                });
            });
            setCards((prevCards) => {
                return prevCards.map((card) => {
                    return { ...card, disabled: true };
                });
            });
            resetFlipped();
            setTimeout(() => {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        return {
                            ...card,
                            isFlipped: false,
                            disabled: false,
                        };
                    });
                });
            }, 3000);
            setMovesCounter((prevMovesCounter) => prevMovesCounter + 1);
        }
    }, [firstFlipped, secondFlipped]);

    const resetFlipped = () => {
        setFirstFlipped();
        setSecondFlipped();
    };

    const resetGame = () => {
        setCards((prevCards) => {
            return prevCards.map((card) => {
                return { ...card, disabled: false, isFlipped: false };
            });
        });
        resetFlipped();
        setMovesCounter((prevMovesCounter) => 0);
    };

    const displayCards = cards.map((card) => (
        <Card
            key={card.id}
            value={card.value}
            id={card.id}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            disabled={card.disabled}
            handleClick={() => handleClick(card.value, card.id)}
        />
    ));

    return (
        <>
            <nav className="nav">
                <h1 className="nav__heading">memory</h1>
                <button className="nav__btn btn btn-yellow">Menu</button>
            </nav>
            <button className="btn btn-grey btn-small" onClick={resetGame}>
                Restart
            </button>
            <button
                className="btn btn-yellow btn-small"
                onClick={() => props.handleStartGame((prev) => false)}
            >
                New Game
            </button>
            <main className="cards-grid">{displayCards}</main>
            <footer className="footer">
                <MovesCounter movesCounter={movesCounter} />
                <Stopwatch playerStartedGame={playerStartedGame}/>
            </footer>
        </>
    );
};

export default Game;
