import React from "react";
import "./alert.css"; // Certifique-se de adicionar estilo conforme necessário

const Alert = ({ message, errors, type, onClose }) => {
  if (!message && (!errors || errors.length === 0)) return null;

  return (
    <div className={`alert ${type}`}>
      {message && <strong>{message}</strong>}
      {errors && errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Alert;
