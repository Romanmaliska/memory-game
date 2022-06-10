import React from "react";
import "./card.scss";

const Cards = (props) => {
    return (
        <section>  
            {props.isMatched ? (
                <button className="cards-grid__card isMatched" id={props.id}>
                    {props.value}
                </button>
            ) : props.isFlipped ? (
                <button className="cards-grid__card isFlipped" id={props.id}>
                    {props.value}
                </button>
            ) : (
                <button
                    className="cards-grid__card notFlipped"
                    id={props.id}
                    onClick={props.handleClick}
                    disabled={props.disabled}
                ></button>
            )}
        </section>
    );
};

export default Cards;
