import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

const ModalOnePlayerGameStats = (props) =>
    props.isGameFinished
        ? ReactDOM.createPortal(
              <div className="modal-overlay">
                  <div className="modal">
                      <h2 className="modal__heading">You did it!</h2>
                      <p className="modal__text">
                          Game over! Here is how you got on…
                      </p>
                      <section className="modal__stats">
                          <p>Time Elapsed</p>
                          <p>
                              <span className="modal__number">
                                  {(" 0" + Math.floor(props.time / 60)).slice(
                                      -2
                                  )}
                                  :
                              </span>
                              <span className="modal__number">
                                  {("0" + Math.floor(props.time % 60)).slice(
                                      -2
                                  )}
                              </span>
                          </p>
                      </section>
                      <section className="modal__stats">
                          <p className="modal__neco">Moves Taken</p>
                          <p className="modal__number">{props.movesCounter}</p>
                      </section>
                      <button className="btn btn--orange" onClick={props.handleRestart}>
                          Restart
                      </button>
                      <button
                          className="btn"
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
