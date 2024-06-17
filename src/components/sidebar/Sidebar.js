import React, {useState, useEffect} from "react";
import { faHouse, faBook, faUser, faThumbsUp, faBars } from '@fortawesome/free-solid-svg-icons';
import MenuItem from "../manuitem/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/dev7.jpg"

const Sidebar = () => {
    const [show, setShow] = useState(false);
    
    const handlerCick = () => {
        var menu = document.querySelector('.menu-opcoes-box');
        if (menu.style.display === 'block' || menu.style.display === '') {
            menu.style.display = 'none';
            setShow(false);
        } else {
            menu.style.display = 'block';
            setShow(true);
        }
    };

    useEffect(() => {
        // Função para atualizar o estado do menu com base no tamanho da janela
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
    
        // Adiciona o event listener quando o componente é montado
        window.addEventListener('resize', handleResize);
    
        // Remove o event listener quando o componente é desmontado para evitar vazamentos de memória
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <div className="menu-lateral-box">
            <div className="logo">
                <img
                    src={Logo}
                    alt="Logo"
                />
            </div>
            <nav className="menu-opcoes-box">
                <ul>
                    <MenuItem icon={faHouse} text="Dashboard" route="/" />
                    <MenuItem icon={faUser} text="Solicitar Usuário" route="/solicitacao-usuario" />
                    <MenuItem icon={faBook} text="Requisições de Acesso" route="/requisicao-acesso"/>
                    <MenuItem icon={faThumbsUp} text="Aprovar/Reprovar" route="/aprovacao-reprovacao" />
                </ul>
            </nav>
            <button id="menu-toggle" className="menu-toggle" aria-label="Abrir menu" onClick={handlerCick}>
                <FontAwesomeIcon icon={faBars} />
            </button>
        </div>
    );
}

export default Sidebar;