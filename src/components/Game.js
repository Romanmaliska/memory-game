import React from "react";
import Card from "./Card";
import MovesCounter from "./MovesCounter";
import Stopwatch from "./Stopwatch";
import PlayerChanger from "./PlayerChanger";
import ModalMenuBtn from "./Modals/ModalMenuBtn";
import ModalOnePlayerGameStats from "./Modals/ModalOnePlayerGameStats";
import ModalTwoPlayersGameStats from "./Modals/ModalTwoPlayersGameStats";
import "./game.scss";

const Game = (props) => {
    //creating card's array with duplicated numbers based on chosen grid size
    const createCards = () => {
        const cardsNumbers = [];
        for (let i = 1; i <= props.gridSize; i++) {
            cardsNumbers.push(i);
        }
        return [...cardsNumbers, ...cardsNumbers];
    };

    // shuflling the cards array and add default objects keys and values
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
    //counting the pairs of cards flipped by player
    const [movesCounter, setMovesCounter] = React.useState(0);
    const [secondFlipped, setSecondFlipped] = React.useState();
    const [p1Points, setP1Points] = React.useState(0);
    const [p2Points, setP2Points] = React.useState(0);

    //displaying Game component
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

    // assigning the card's value and id to firstFlipped or secondFlipped
    const handleClick = (value, id) => {
        firstFlipped
            ? setSecondFlipped({ value, id })
            : setFirstFlipped({ value, id });
    };

    // reseting flipped cards to default values
    const resetFlipped = () => {
        setFirstFlipped();
        setSecondFlipped();
    };

    // managing cards selected by player
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
            movesCounter % 2 === 0
                ? setP1Points((prevPoints) => prevPoints + 1)
                : setP2Points((prevPoints) => prevPoints + 1);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstFlipped, secondFlipped]);

    const [playerStartedGame, setPlayerStartedGame] = React.useState(false);

    //toggling Modal - ModalMenuBtn
    const [isShowingMenuModal, setIsShowingMenuModal] = React.useState(false);

    const toggleMenuModal = () => {
        setIsShowingMenuModal(!isShowingMenuModal);
    };

    // checking if game is finished
    let isGameFinished = cards.every((card) => card.isMatched);

    React.useEffect(() => {
        if (isGameFinished) {
            setPlayerStartedGame(false);
        } else if (movesCounter || firstFlipped) {
            setPlayerStartedGame(true);
        }
    }, [movesCounter, firstFlipped, isGameFinished]);

    //sending time from Stopwatch to ModalOnePlayerGameStats
    const [time, setTime] = React.useState(0);

    const stopwatchTime = (seconds) => {
        setTime(seconds);
    };

    // handling restart of the game from Modals btns - ModalMenuBtn and ModalOnePlayerGameStats
    const handleRestart = () => {
        setCards(() => shuffleCards());
        resetFlipped();
        setPlayerStartedGame(false);
        setMovesCounter((prevMovesCounter) => 0);
        setP1Points(0);
        setP2Points(0);
        if (!isGameFinished) {
            toggleMenuModal();
        }
    };

    return (
        <>
            <nav className="nav">
                <h1 className="nav__heading">memory</h1>
                <button
                    className="nav__btn btn btn--orange"
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
                        isShowingMenuModal={isShowingMenuModal}
                        stopwatchTime={stopwatchTime}
                    />
                </footer>
            ) : (
                <footer className="footer">
                    <PlayerChanger
                        movesCounter={movesCounter}
                        p1Points={p1Points}
                        p2Points={p2Points}
                    />
                </footer>
            )}
             <ModalMenuBtn
                className="modal"
                isShowingMenuModal={isShowingMenuModal}
                toggleMenuModal={toggleMenuModal}
                handleRestart={handleRestart}
                handleStartGame={props.handleStartGame}
            />
             {props.numberOfPlayers === 1 && <ModalOnePlayerGameStats
                className="modal"
                isGameFinished={isGameFinished}
                handleRestart={handleRestart}
                handleStartGame={props.handleStartGame}
                movesCounter={movesCounter}
                time={time}
            />}
              {props.numberOfPlayers === 2 && <ModalTwoPlayersGameStats
                className="modal"
                isGameFinished={isGameFinished}
                handleRestart={handleRestart}
                handleStartGame={props.handleStartGame}
                movesCounter={movesCounter}
                p1Points={p1Points}
                p2Points={p2Points}
            />}
        </>
    );
};

export default Game;
