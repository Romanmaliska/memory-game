import React from "react";
import "./card.scss";

const Cards = (props) => {
    return (
        <section>
            {props.isMatched ? (
                <button
                    className={
                        props.gridSize === 8
                            ? "cards-grid-16__card isMatched"
                            : "cards-grid-36__card isMatched"
                    }
                    id={props.id}
                >
                    {props.value}
                </button>
            ) : props.isFlipped ? (
                <button
                    className={
                        props.gridSize === 8
                            ? "cards-grid-16__card isFlipped"
                            : "cards-grid-36__card isFlipped"
                    }
                    id={props.id}
                >
                    {props.value}
                </button>
            ) : (
                <button
                    className={
                        props.gridSize === 8
                            ? "cards-grid-16__card notFlipped"
                            : "cards-grid-36__card notFlipped"
                    }
                    id={props.id}
                    onClick={props.handleClick}
                    disabled={props.disabled}
                ></button>
            )}
        </section>
    );
};

export default Cards;
