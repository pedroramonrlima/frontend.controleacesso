import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ show, onClose, children, title = "Requisição de Acesso", onFooter, small }) => {

  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={onClose}>
      <div className={small ? "modal-content small" : "modal-content larg"} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h1 className="modal-title">{title}</h1>
          </div>
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
