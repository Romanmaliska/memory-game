import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

const ModalMenuBtn = (props) =>
    props.isShowingMenuModal
        ? ReactDOM.createPortal(
              <div className="modal">
                  <div className="modal__frame">
                      <button
                          className="btn btn--big btn--orange"
                          onClick={props.handleRestart}
                      >
                          Restart
                      </button>
                      <button
                          className="btn btn--big "
                          onClick={() => props.handleStartGame((prev) => false)}
                      >
                          New Game
                      </button>
                      <button
                          className="btn btn--big "
                          onClick={props.toggleMenuModal}
                      >
                          Resume Game
                      </button>
                  </div>
              </div>,
              document.body
          )
        : null;

export default ModalMenuBtn;
