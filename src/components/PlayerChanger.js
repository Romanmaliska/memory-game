import React from "react";

const PlayerChanger = (props) => {
    return (
        <>
            {props.players.map((player, index) => {
                return (
                    <section
                        className={
                            index === props.activePlayerIndex
                                ? "stats stats--selected"
                                : "stats "
                        }
                    >
                        <p className="stats__text">P {player.player}</p>
                        <p className="stats__data">{player.points}</p>
                    </section>
                );
            })}
        </>
    );
};

export default PlayerChanger;
