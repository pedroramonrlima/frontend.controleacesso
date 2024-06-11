import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

//import '@fortawesome/fontawesome-free/css/all.min.css';
import './menuitem.css';

const MenuItem = ({ icon, text, route }) => {
    return (
      <li className={({ isActive }) => isActive ? 'active' : ''}>
        <NavLink 
          end 
          to={route} 
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <FontAwesomeIcon icon={icon} />
          <span>{text}</span>
        </NavLink>
      </li>
    );
  };

export default MenuItem;