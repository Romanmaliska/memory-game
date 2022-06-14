import React from "react";

const PlayerChanger = (props) => {
    return (
        <section>
            <p className="stats__text">P 1</p>
            <p className="stats__data">{props.movesCounter%2 === 0 ? props.movesCounter : "fdf"}</p>
            <p className="stats__text">P 2</p>
            <p className="stats__data">{props.movesCounter%4 === 0 ? props.movesCounter : "fdf"}</p>
        </section>
    );
};

export default PlayerChanger;
