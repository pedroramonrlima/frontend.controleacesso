import React from "react";
import { faHouse, faBook, faUser, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import MenuItem from "../manuitem/MenuItem";

const Sidebar = () => {
    return (
        <div className="menu-lateral-box">
            <div className="logo">
                <img
                    src="https://scontent-gru1-1.xx.fbcdn.net/v/t39.30808-6/307093994_790794288795118_2285183251695484638_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=OQv_ac01c5UQ7kNvgH07-fx&_nc_ht=scontent-gru1-1.xx&oh=00_AYCbZsv4ShO2s4qzJNJHk-mcldsWmLNw7g3NChRt-A6O7g&oe=666E3AE1"
                    alt="Logo"
                />
            </div>
            <nav className="menu-opcoes-box">
                <ul>
                    <MenuItem icon={faHouse} text="Dashboard" route="/" />
                    <MenuItem icon={faBook} text="Requisições de Acesso" route="/requisitions" isActive/>
                    <MenuItem icon={faUser} text="Solicitar Usuário" route="/request-user" />
                    <MenuItem icon={faThumbsUp} text="Aprovar/Reprovar" route="/approve-reject" />
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;