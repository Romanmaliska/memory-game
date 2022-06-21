import React from "react";
import "./card.scss";

const Cards = (props) => {
    return (
        <>
            {props.isMatched ? (
                <button className="cards__card cards__card--isMatched" id={props.id}>
                    {props.value}
                </button>
            ) : props.isFlipped ? (
                <button className="cards__card cards__card--isFlipped" id={props.id}>
                    {props.value}
                </button>
            ) : (
                <button
                    className="cards__card"
                    id={props.id}
                    onClick={props.handleClick}
                    disabled={props.disabled}
                ></button>
            )}
        </>
    );
};

export default Cards;
