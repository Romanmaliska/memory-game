import React from "react";

const Stopwatch = (props) => {
    const [time, setTime] = React.useState(0);
    const [intervalId, setIntervalId] = React.useState();

    React.useEffect(() => {
        if (props.playerStartedGame) {
            setIntervalId(
                setInterval(() => setTime((prevTime) => prevTime + 1), 1000)
            );
        } else {
            clearInterval(intervalId);
            setIntervalId();
            setTime(0);
        }
    }, [props.playerStartedGame]);

    return (
        <section className="stats">
            <p className="stats__text">Time</p>
            <p className="stats__data">{time}</p>
        </section>
    );
};

export default Stopwatch;
