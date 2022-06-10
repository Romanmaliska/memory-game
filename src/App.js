import React from "react";
import GameOptions from "./components/GameOptions";
import Game from "./components/Game";
import "./app.scss";

function App() {
    const [isGameOn, setIsGameOn] = React.useState(false);
    const [numberOfPlayers, setNumberOfPlayers] = React.useState(1);
    const [gridSize, setGridSize] = React.useState(8);

    const handleStartGame = (bool) => {
        setIsGameOn(bool);
    };

    const handleNumberOfPlayers = (number) => {
        setNumberOfPlayers(number);
    };

    const handleGridSize = (number) => {
        setGridSize(number);
    };

    return (
        <div className="App">
            {isGameOn ? (
                <Game handleStartGame={handleStartGame} numberOfPlayers={numberOfPlayers} gridSize={gridSize}/>
            ) : (
                <GameOptions
                    handleNumberOfPlayers={handleNumberOfPlayers}
                    handleGridSize={handleGridSize}
                    handleStartGame={handleStartGame}
                />
            )}
        </div>
    );
}

export default App;
