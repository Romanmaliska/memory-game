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
            <p className="stats__data">
                <span className="stopwatch__time">
                    {("0" + Math.floor(time / 60)).slice(-2)}:
                </span>
                <span className="stopwatch__time">
                    {("0" + Math.floor(time % 60)).slice(-2)}
                </span>
            </p>
        </section>
    );
};

export default Stopwatch;
