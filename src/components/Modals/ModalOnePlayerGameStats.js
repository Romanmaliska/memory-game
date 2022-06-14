import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

const ModalOnePlayerGameStats = (props) =>
    props.isGameFinished
        ? ReactDOM.createPortal(
              <div className="modal-overlay">
                  <div className="modal">
                      <h1>You did it!</h1>
                      <p>Game over! Heres how you got on…</p>
                      <section>
                          <p>Time Elapsed{props.movesCounter}</p>
                      </section>
                      <section>
                          <p>Moves Taken</p>
                      </section>
                      <button
                          className="btn btn-grey"
                          onClick={props.handleRestart}
                      >
                          Restart
                      </button>
                      <button
                          className="btn btn-yellow "
                          onClick={() => props.handleStartGame((prev) => false)}
                      >
                          New Game
                      </button>
                  </div>
              </div>,
              document.body
          )
        : null;

export default ModalOnePlayerGameStats;
