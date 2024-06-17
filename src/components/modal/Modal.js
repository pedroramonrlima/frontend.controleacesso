import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ show, onClose, children, title, onFooter }) => {

  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={onClose}>
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
    </div>
  );
};

export default Modal;
