import React from "react";

const PlayerChanger = (props) => {
    

    return (
        <>
            <section className={props.movesCounter%2 !== 0 ? "stats" : "stats stats--selected"}>
                <p className={props.movesCounter%2 !== 0 ? "stats__text" : "stats__text stats__text--selected"}>P 1</p>
                <p className={props.movesCounter%2 !== 0 ? "stats__data" : "stats__data stats__data--selected"}>{props.p1Points}</p>
            </section>
            <section className={props.movesCounter%2 === 0 ? "stats" : "stats stats--selected"}>
                <p className={props.movesCounter%2 === 0 ? "stats__text" : "stats__text stats__text--selected"}>P 2</p>
                <p className={props.movesCounter%2 === 0 ? "stats__data" : "stats__data stats__data--selected"}>{props.p2Points}</p>
            </section>
        </>
    );
};

export default PlayerChanger;
