import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//import '@fortawesome/fontawesome-free/css/all.min.css';
import './menuitem.css';

const MenuItem = ({ icon, text, isActive, route }) => {
    return (

        <li className={isActive ? 'active' : ''}>
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
        </li>

    );
};

export default MenuItem;