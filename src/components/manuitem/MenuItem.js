import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ icon, text, route }) => {
    return (
        <NavLink 
        end 
        to={route} 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
      <li className={({ isActive }) => isActive ? 'active' : ''}>
        
          <FontAwesomeIcon icon={icon} />
          <span>{text}</span>
        
      </li>
      </NavLink>
    );
  };

export default MenuItem;