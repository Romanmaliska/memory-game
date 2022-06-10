import React from "react";

const movesCounter = (props) => {
    return (
        <section className="stats">
            <p className="stats__text">Moves</p>
            <p className="stats__data">{props.movesCounter}</p>
        </section>
    );
};

export default movesCounter;
