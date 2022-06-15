import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

const ModalOnePlayerGameStats = (props) =>
    props.isGameFinished
        ? ReactDOM.createPortal(
              <div className="modal-overlay">
                  <div className="centered">
                      <div className="modal">
                          <h2 className="modal__heading">You did it!</h2>
                          <p className="modal__text">
                              Game over! Here is how you got on…
                          </p>
                          <section>
                              <p className="modal__text">
                                  Time Elapsed 
                                  <span>
                                      {("0" + Math.floor(props.time / 60)).slice(
                                          -2
                                      )}
                                      :
                                  </span>
                                  <span className="stopwatch__time">
                                      {("0" + Math.floor(props.time % 60)).slice(
                                          -2
                                      )}
                                  </span>
                              </p>
                          </section>
                          <section>
                              <p className="modal__text">
                                  Moves Taken {props.movesCounter}
                              </p>
                          </section>
                          <button
                              className="btn btn-grey"
                              onClick={props.handleRestart}
                          >
                              Restart
                          </button>
                          <button
                              className="btn btn-yellow "
                              onClick={() =>
                                  props.handleStartGame((prev) => false)
                              }
                          >
                              New Game
                          </button>
                      </div>
                  </div>
              </div>,
              document.body
          )
        : null;

export default ModalOnePlayerGameStats;
