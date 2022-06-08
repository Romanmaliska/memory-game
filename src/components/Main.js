import React from "react";
import Card from "./Card";
import "./main.scss";

const Main = () => {
    const createCards = () => {
        const cardsNumbers = [];
        for (let i = 1; i <= 4; i++) {
            cardsNumbers.push(i);
        }
        return [...cardsNumbers, ...cardsNumbers];
    };

    const shuffleCards = () => {
        const shuffledCards = createCards()
            .sort(() => Math.random() - 0.5)
            .map((card) => ({
                value: card,
                id: Math.random(),
                isFlipped: false,
                isMatched: false,
                disabled: false,
            }));

        return shuffledCards;
    };

    const [cards, setCards] = React.useState(() => shuffleCards());
    const [firstFlipped, setFirstFlipped] = React.useState();
    const [secondFlipped, setSecondFlipped] = React.useState();

    const handleClick = (value, id) => {
        firstFlipped
            ? setSecondFlipped({ value, id })
            : setFirstFlipped({ value, id });
    };

    React.useEffect(() => {
        if (secondFlipped && firstFlipped.value === secondFlipped.value) {
            setCards((prevCards) => {
                return prevCards.map((card) => {
                    return card.value === secondFlipped.value
                        ? {
                              ...card,
                              isMatched: true,
                          }
                        : card;
                });
            });
            reset();
        }

        if (firstFlipped) {
            setCards((prevCards) => {
                return prevCards.map((card) => {
                    return card.id === firstFlipped.id
                        ? {
                              ...card,
                              isFlipped: true,
                          }
                        : card;
                });
            });
        }

        if (firstFlipped && secondFlipped) {
            setCards((prevCards) => {
                return prevCards.map((card) => {
                    return card.id === secondFlipped.id
                        ? {
                              ...card,
                              isFlipped: true,
                          }
                        : card;
                });
            });
            setCards((prevCards) => {
                return prevCards.map((card) => {
                    return  { ...card, disabled: true,}
                      
                });
            });
            reset();
            setTimeout(() => {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        return {
                            ...card,
                            isFlipped: false,
                            disabled: false
                        };
                    });
                });
            }, 3000);
        }
    }, [firstFlipped, secondFlipped]);

    const reset = () => {
        setFirstFlipped();
        setSecondFlipped();
    };

    const displayCards = cards.map((card) => (
        <Card
            key={card.id}
            value={card.value}
            id={card.id}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            disabled={card.disabled}
            handleClick={() => handleClick(card.value, card.id)}
        />
    ));

    return (
        <div>
            <h1>Memory game</h1>
            {displayCards}
        </div>
    );
};

export default Main;
