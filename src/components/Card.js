import React from "react";
import "./card.scss";

const Cards = (props) => {
    return (
        <div className="cards">
            
            {props.isMatched ? (
                <button className="card isMatched" id={props.id}>
                    {props.value}
                </button>
            ) : props.isFlipped ? (
                <button className="card isFlipped" id={props.id}>
                    {props.value}
                </button>
            ) : (
                <button
                    className="card notFlipped"
                    id={props.id}
                    onClick={props.handleClick}
                    disabled={props.disabled}
                ></button>
            )}
        </div>
    );
};

export default Cards;
