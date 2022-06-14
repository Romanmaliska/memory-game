import React from "react";
import Card from "./Card";
import MovesCounter from "./MovesCounter";
import Stopwatch from "./Stopwatch";
import PlayerChanger from "./PlayerChanger";
import ModalMenuBtn from "./Modals/ModalMenuBtn";
import useModalMenuBtn from "./Modals/useModalMenuBtn";
import ModalOnePlayerGameStats from "./Modals/ModalOnePlayerGameStats";
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

    const [cards, setCards] = React.useState(()=>shuffleCards());
    const [firstFlipped, setFirstFlipped] = React.useState();
    const [secondFlipped, setSecondFlipped] = React.useState();
    const [movesCounter, setMovesCounter] = React.useState(0);
    const [playerStartedGame, setPlayerStartedGame] = React.useState(false);
    let isGameFinished = cards.every((card) => card.isMatched);
    console.log(cards)

    //check if game started for Stopwatch

    React.useEffect(() => {
        if (isGameFinished) {
            setPlayerStartedGame(false);
        } else if (movesCounter || firstFlipped) {
            setPlayerStartedGame(true);
        }
    }, [movesCounter, firstFlipped, isGameFinished]);

    // assign the cards value and id to firstFlipped or secondFlipped

    const handleClick = (value, id) => {
        firstFlipped
            ? setSecondFlipped({ value, id })
            : setFirstFlipped({ value, id });
    };

    // reseting Flipped cards

    const resetFlipped = () => {
        setFirstFlipped();
        setSecondFlipped();
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

    const displayCards = cards.map((card) => (
        <Card
            key={card.id}
            value={card.value}
            id={card.id}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            disabled={card.disabled}
            gridSize={props.gridSize}
            handleClick={() => handleClick(card.value, card.id)}
        />
    ));

    // render Modal for Menu button

    const { isShowingMenuModal, toggleMenuModal } = useModalMenuBtn();

    // handle restart game from Modal btn Restart

    const handleRestart = () => {
        setCards((prevCards) => {
            return prevCards.map((card) => {
                return {
                    ...card,
                    disabled: false,
                    isFlipped: false,
                    isMatched: false,
                };
            });
        });
        resetFlipped();
        setPlayerStartedGame(false)
        setMovesCounter((prevMovesCounter) => 0);
        if (!isGameFinished) {
            toggleMenuModal();
        }
    };

    return (
        <>
            <nav className="nav">
                <h1 className="nav__heading">memory</h1>
                <button
                    className="nav__btn btn btn-yellow"
                    onClick={toggleMenuModal}
                >
                    Menu
                </button>
            </nav>
            <main
                className={
                    props.gridSize === 8 ? "cards-grid-16" : "cards-grid-36"
                }
            >
                {displayCards}
            </main>
            {props.numberOfPlayers === 1 ? (
                <footer className="footer">
                    <MovesCounter movesCounter={movesCounter} />
                    <Stopwatch
                        isGameFinished={isGameFinished}
                        playerStartedGame={playerStartedGame}
                        isShowing={isShowingMenuModal}
                        movesCounter={movesCounter}
                    />
                </footer>
            ) : (
                <footer className="footer">
                    <PlayerChanger movesCounter={movesCounter} />
                </footer>
            )}
            <ModalMenuBtn
                className="modal"
                isShowingMenuModal={isShowingMenuModal}
                toggleMenuModal={toggleMenuModal}
                handleRestart={handleRestart}
                handleStartGame={props.handleStartGame}
            />
            <ModalOnePlayerGameStats
                className="modal"
                isGameFinished={isGameFinished}
                handleRestart={handleRestart}
                handleStartGame={props.handleStartGame}
            />
        </>
    );
};

export default Game;
