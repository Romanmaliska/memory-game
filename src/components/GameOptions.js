import React from "react";
import "./GameOptions.scss";

const GameOptions = (props) => {
    return (
        <div className="options">
            <h1 className="options__heading">memory</h1>
            <div className="select">
                <h2 className="select__heading">Number of Players</h2>
                <section className="select__option">
                    <button
                        className={
                            props.numberOfPlayers === 1
                                ? "btn btn-dark four"
                                : "btn btn-grey four"
                        }
                        onClick={() => props.handleNumberOfPlayers(1)}
                    >
                        1
                    </button>
                    <button
                        className={
                            props.numberOfPlayers === 2
                                ? "btn btn-dark four"
                                : "btn btn-grey four"
                        }
                        onClick={() => props.handleNumberOfPlayers(2)}
                    >
                        2
                    </button>
                    <button
                        className={
                            props.numberOfPlayers === 3
                                ? "btn btn-dark four"
                                : "btn btn-grey four"
                        }
                        onClick={() => props.handleNumberOfPlayers(3)}
                    >
                        3
                    </button>
                    <button
                        className={
                            props.numberOfPlayers === 4
                                ? "btn btn-dark four"
                                : "btn btn-grey four"
                        }
                        onClick={() => props.handleNumberOfPlayers(4)}
                    >
                        4
                    </button>
                </section>
                <h2 className="select__heading">Grid Size</h2>
                <section className="select__option">
                    <button
                        className={
                            props.gridSize === 8
                                ? "btn btn-dark two"
                                : "btn btn-grey two"
                        }
                        onClick={() => props.handleGridSize(8)}
                    >
                        4x4
                    </button>
                    <button
                        className={
                            props.gridSize === 18
                                ? "btn btn-dark two"
                                : "btn btn-grey two"
                        }
                        onClick={() => props.handleGridSize(18)}
                    >
                        6x6
                    </button>
                </section>
                <button
                    className="btn btn-yellow btn-start"
                    onClick={() => props.handleStartGame((prev) => true)}
                >
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default GameOptions;
