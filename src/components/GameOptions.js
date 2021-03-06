import React from "react";
import "./GameOptions.scss";

const GameOptions = (props) => {
    const playersButtons = [1, 2, 3, 4];
    const gridButtons = [8, 18];

    return (
        <div className="options">
            <h1 className="options__heading">memory game</h1>
            <div className="options__select">
                <h2 className="options__text">Number of Players</h2>
                <section className="options__option ">
                    {playersButtons.map((button) => {
                        return (
                            <button key={button}
                                className={
                                    props.numberOfPlayers === button
                                        ? "btn btn--selected"
                                        : "btn"
                                }
                                onClick={() =>
                                    props.handleNumberOfPlayers(button)
                                }
                            >
                                {button}
                            </button>
                        );
                    })}
                </section>
                <h2 className="options__text">Grid Size</h2>
                <section className="options__option ">
                    {gridButtons.map((button) => {
                        return (
                            <button key={button}
                                className={
                                    props.gridSize === button
                                        ? "btn btn--selected"
                                        : "btn"
                                }
                                onClick={() => props.handleGridSize(button)}
                            >
                                {button === 8 ? "4 x 4" : "6 x 6"}
                            </button>
                        );
                    })}
                </section>
                <button
                    className="btn btn--orange btn--big"
                    onClick={() => props.handleStartGame(true)}
                >
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default GameOptions;
