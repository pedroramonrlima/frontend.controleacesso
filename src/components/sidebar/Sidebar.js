import React, { useState, useEffect } from "react";
import { faHouse, faBook, faUser, faThumbsUp, faBars, faUserGroup, faGear, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import MenuItem from "../manuitem/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/logo.png";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handlerClick = () => {
    var menu = document.querySelector('.menu-opcoes-box');
    if (menu.style.display === 'block' || menu.style.display === '') {
      menu.style.display = 'none';
      setShow(false);
    } else {
      menu.style.display = 'block';
      setShow(true);
    }
  };

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  useEffect(() => {
    const handleResize = () => {
      var menu = document.querySelector('.menu-opcoes-box');
      if (window.innerWidth >= 768) {
        setShow(true);
        menu.style.display = 'block';
      } else {
        setShow(false);
        menu.style.display = 'none';
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="menu-lateral-box">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <nav className="menu-opcoes-box">
        <ul className="menu-opcoes-item menu-opcoes-list">
          <MenuItem icon={faHouse} text="Dashboard" route="/" />
          <MenuItem icon={faUser} text="Solicitar Usuário" route="/solicitacao-usuario" />
          <MenuItem icon={faBook} text="Requisições de Acesso" route="/requisicao-acesso" />
          <MenuItem icon={faThumbsUp} text="Aprovar/Reprovar" route="/aprovacao-reprovacao" />
          <li>
            <a href="#" onClick={toggleSubmenu}>
              <FontAwesomeIcon icon={faGear} /><span>Administração</span><FontAwesomeIcon icon={faChevronDown} />
            </a>
            {showSubmenu && (
              <ul className="submenu">
                <MenuItem icon={faUserGroup} text="Grupos" route="/grupo-usuario" />
              </ul>
            )}
          </li>
        </ul>
      </nav>
      <button id="menu-toggle" className="menu-toggle" aria-label="Abrir menu" onClick={handlerClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
};

export default Sidebar;
