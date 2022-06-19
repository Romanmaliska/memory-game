import React from "react";
import "./card.scss";

const Cards = (props) => {
    return (
        <>
            {props.isMatched ? (
                <button className="cards-grid__card cards-grid__card--isMatched" id={props.id}>
                    {props.value}
                </button>
            ) : props.isFlipped ? (
                <button className="cards-grid__card cards-grid__card--isFlipped" id={props.id}>
                    {props.value}
                </button>
            ) : (
                <button
                    className="cards-grid__card"
                    id={props.id}
                    onClick={props.handleClick}
                    disabled={props.disabled}
                ></button>
            )}
        </>
    );
};

export default Cards;
