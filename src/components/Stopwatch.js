import React from "react";

const Stopwatch = (props) => {
    const [seconds, setSeconds] = React.useState(0);
    const [intervalId, setIntervalId] = React.useState();

    React.useEffect(() => {
        if (
            props.playerStartedGame &&
            !props.isShowingMenuModal &&
            !props.isGameFinished
        ) {
            setIntervalId(
                setInterval(() => setSeconds((seconds) => seconds + 1), 1000)
            );
        } else if (props.isShowingMenuModal) {
            clearInterval(intervalId);
            setIntervalId();
        } else if (props.isGameFinished || !props.playerStartedGame) {
            if (seconds > 0) {
                props.stopwatchTime(seconds);
            }
            clearInterval(intervalId);
            setIntervalId();
            setSeconds(0);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        props.playerStartedGame,
        props.isGameFinished,
        props.isShowingMenuModal,
    ]);

    return (
        <section className="stats">
            <p className="stats__text">Time</p>
            <p className="stats__data">
                <span className="stopwatch__time">
                    {("0" + Math.floor(seconds / 60)).slice(-2)}:
                </span>
                <span className="stopwatch__time">
                    {("0" + Math.floor(seconds % 60)).slice(-2)}
                </span>
            </p>
        </section>
    );
};

export default Stopwatch;
