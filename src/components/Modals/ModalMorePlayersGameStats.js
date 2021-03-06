import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

const ModalTwoPlayersGameStats = (props) => {
    if (!props.isGameFinished) {
        return null;
    }
    let players = [...props.players].sort((a, b) => b.points - a.points);
    let isTie = players[0].points === players[1].points;

    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal__frame">
                <h2 className="modal__heading">
                    {isTie
                        ? "It's a tie!"
                        : `Player ${players[0].player} wins!`}
                </h2>
                <p className="modal__text">Game over! Here’s how you got on…</p>
                {players.map((player) => {
                    return (
                        <div
                            className={
                                players[0].points === player.points
                                    ? "modal__stats modal__stats--higlighted"
                                    : "modal__stats "
                            }
                        >
                            <span>Player {player.player}</span>
                            <span>
                                {player.points} Pairs
                            </span>
                        </div>
                    );
                })}
                <button
                    className="btn btn--orange"
                    onClick={props.handleRestart}
                >
                    Restart
                </button>
                <button
                    className="btn "
                    onClick={() => props.handleStartGame(false)}
                >
                    New Game
                </button>
            </div>
        </div>,
        document.body
    );
};

export default ModalTwoPlayersGameStats;
