import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

const ModalTwoPlayersGameStats = (props) =>
    props.isGameFinished
        ? ReactDOM.createPortal(
              <div className="modal-overlay">
                  <div className="centered">
                      <div className="modal">
                          <h2 className="modal__heading">
                              {props.p1Points === props.p2Points
                                  ? "Its a tie!"
                                  : props.p1Points > props.p2Points
                                  ? "Player 1 Wins!"
                                  : "Player 2 Wins!"}
                          </h2>
                          <p className="modal__text">
                              Game over! Here’s how you got on…
                          </p>
                          <p className="modal__field modal__field--higlighted">
                              Player 1
                              <span className="mmodal__field__number">
                                  {props.p1Points} Pairs
                              </span>
                          </p>
                          <p className="modal__field">
                              Player 2
                              <span className="modal__field__number">
                                  {props.p2Points} Pairs
                              </span>
                          </p>
                          <button className="btn" onClick={props.handleRestart}>
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

export default ModalTwoPlayersGameStats;
