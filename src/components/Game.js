import React from "react";
import Card from "./Card";
import OnePlayerFooter from "./OnePlayerFooter";
import MorePlayersFooter from "./MorePlayersFooter";
import ModalMenuBtn from "./Modals/ModalMenuBtn";
import ModalOnePlayerGameStats from "./Modals/ModalOnePlayerGameStats";
import ModalTwoPlayersGameStats from "./Modals/ModalMorePlayersGameStats";
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
    //counting the pairs of cards flipped by player
    const [movesCounter, setMovesCounter] = React.useState(0);
    const [firstFlipped, setFirstFlipped] = React.useState();
    const [secondFlipped, setSecondFlipped] = React.useState();
    const [players, setPlayers] = React.useState(
        [
            { player: 1, points: 0, id: 1 },
            { player: 2, points: 0, id: 2 },
            { player: 3, points: 0, id: 3 },
            { player: 4, points: 0, id: 4 },
        ].slice(0, props.numberOfPlayers)
    );

    //displaying Game component
    const displayCards = cards.map((card) => (
        <Card
            key={card.id}
            id={card.id}
            value={card.value}
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

    let activePlayerIndex = movesCounter % props.numberOfPlayers;

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

            if (props.numberOfPlayers === 1) {
                setMovesCounter((prevMovesCounter) => prevMovesCounter + 1);
            } else {
                setPlayers((prevPlayers) => {
                    return prevPlayers.map((item, index) => {
                        return index === activePlayerIndex
                            ? {
                                  ...item,
                                  points: item.points + 1,
                              }
                            : item;
                    });
                });
            }
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
                              disabled: true,
                              isFlipped: true,
                          }
                        : { ...card, disabled: true };
                });
            });
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
            }, 1500);
            setMovesCounter((prevMovesCounter) => prevMovesCounter + 1);
            resetFlipped();
        }
    }, [firstFlipped, secondFlipped, props.numberOfPlayers, activePlayerIndex]);

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
        setPlayers((prevPlayers) => {
            return prevPlayers.map((player) => {
                return {
                    ...player,
                    points: 0,
                };
            });
        });
        resetFlipped();
        setPlayerStartedGame(false);
        setMovesCounter(0);
        if (!isGameFinished) {
            toggleMenuModal();
        }
    };

    return (
        <>
            <nav className="nav">
                <h1 className="nav__heading">memory</h1>
                <button
                    className="btn btn--orange btn--w-auto "
                    onClick={toggleMenuModal}
                >
                    Menu
                </button>
            </nav>
            <main
                className={
                    props.gridSize === 8 ? "cards" : "cards cards--large"
                }
            >
                {displayCards}
            </main>
            {props.numberOfPlayers === 1 ? (
                <footer className="footer">
                    <OnePlayerFooter
                        isGameFinished={isGameFinished}
                        playerStartedGame={playerStartedGame}
                        isShowingMenuModal={isShowingMenuModal}
                        stopwatchTime={stopwatchTime}
                        movesCounter={movesCounter}
                    />
                </footer>
            ) : (
                <footer className={"footer footer--morePlayers"}>
                    <MorePlayersFooter
                        players={players}
                        activePlayerIndex={activePlayerIndex}
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
            {props.numberOfPlayers === 1 && (
                <ModalOnePlayerGameStats
                    className="modal"
                    isGameFinished={isGameFinished}
                    handleRestart={handleRestart}
                    handleStartGame={props.handleStartGame}
                    movesCounter={movesCounter}
                    time={time}
                />
            )}
            {props.numberOfPlayers !== 1 && (
                <ModalTwoPlayersGameStats
                    className="modal"
                    players={players}
                    isGameFinished={isGameFinished}
                    handleRestart={handleRestart}
                    handleStartGame={props.handleStartGame}
                    movesCounter={movesCounter}
                />
            )}
        </>
    );
};

export default Game;
