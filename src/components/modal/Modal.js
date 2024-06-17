import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Modal = ({ show, onClose, children, title, onFooter }) => {
  if (!show) {
    return null;
  }

  return (
    <TransitionGroup>
    <div className="modal" onClick={onClose}>
      <CSSTransition
        in={show}
        timeout={400}
        classNames="modal-content"
        unmountOnExit
      >
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            {title && (
              <h4 className="modal-title">{title}</h4>
            )}
            <button className="close-button" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {onFooter && (
            <div className="modal-footer">
              <button onClick={onClose} className="button">Close</button>
            </div>
          )}
        </div>
      </CSSTransition>
    </div>
    </TransitionGroup>

  );
};

export default Modal;
