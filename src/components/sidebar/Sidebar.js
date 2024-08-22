import React, { useState, useEffect } from "react";
import { faHouse, faBook, faUser, faThumbsUp, faBars, faUserGroup, faGear, faChevronDown, faBan } from '@fortawesome/free-solid-svg-icons';
import MenuItem from "../manuitem/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAccount } from "../../hooks/useAccount";
import Logo from "../../assets/logo.png";

const Sidebar = () => {
  const user = useAccount();
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
          <MenuItem icon={faHouse} text="Dashboard" route="/app" />
          <MenuItem icon={faUser} text="Solicitar Usuário" route="/app/solicitacao-usuario" />
          <MenuItem icon={faBook} text="Requisições de Acesso" route="/app/requisicao-acesso" />
          {(user.isManager || user.isSpecialist) && (
            <>
              <MenuItem icon={faThumbsUp} text="Aprovar/Reprovar" route="/app/aprovacao-reprovacao" />
              <MenuItem icon={faBan} text="Revogar Acessos" route="/app/revogar" />
            </>
          )}
          {user.isAdmin && (
            <li>
              <a href="#" onClick={toggleSubmenu}>
                <FontAwesomeIcon icon={faGear} /><span>Administração</span><FontAwesomeIcon icon={faChevronDown} />
              </a>
              {showSubmenu && (
                <ul className="submenu">
                  <MenuItem icon={faUserGroup} text="Grupos" route="/app/grupo-usuario" />
                </ul>
              )}
            </li>
          )}
        </ul>
      </nav>
      <button id="menu-toggle" className="menu-toggle" aria-label="Abrir menu" onClick={handlerClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
};

export default Sidebar;
