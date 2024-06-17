import React, { useState } from "react";
import Table from "../../components/table";
import Dados, { acessos } from "./dados"
import Modal from "../../components/modal/Modal";
import { faSearch, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./Requisicao.css"

const Requisicoes = () => {
    const [selecteds, setSelecteds] = useState([]);
    const col = ['nome', 'cpf', "rg", 'status',];
    const dados = Dados;
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleAddAccessClick = (acesso) => {
        if (!selecteds.some(item => item.id === acesso.id)) {
            setSelecteds([...selecteds, acesso]);
        }
    };

    const handleRemoveAccessClick = (acesso) => {
        setSelecteds(selecteds.filter(item => item.id !== acesso.id));
    };

    return (
        <>
            <div></div>
            <section className="page-box-title">
                <h2>Minhas Requisições</h2>
                <h4>Para o usuário verificar a lista de requisições criadas</h4>
            </section>
            <section className="page-box-container">
                <div className="btn-box btn-box-right">
                    <button onClick={openModal}>Criar Requisição</button>
                </div>

                <Table columns={col} data={dados} />
            </section>
            <Modal show={showModal} onClose={closeModal}>
                <div className="container-requisicao">
                    <h1>Requisição de Acesso</h1>
                    <div className="user-info">
                        <div className="info">
                            <label htmlFor="usuario">Usuário:</label>
                            <span id="usuario">pedro.ramon</span>
                        </div>
                        <div className="info">
                            <label htmlFor="nome-completo">Nome Completo:</label>
                            <span id="nome-completo">Pedro Ramon Rodrigues Lima</span>
                        </div>
                        <div className="info">
                            <label htmlFor="funcao">Função:</label>
                            <span id="funcao">Analista de Suporte JR</span>
                        </div>
                        <div className="info">
                            <label htmlFor="gestor">Gestor:</label>
                            <span id="gestor">Gleison Rubens</span>
                        </div>
                    </div>
                    <div className="search-section">
                        <label htmlFor="pesquisa">Pesquisa:</label>
                        <div className="search-bar">
                            <input type="text" id="pesquisa" placeholder="Device" />
                            <button><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                    </div>
                    <div className="access-section">
                        <div className="available-access">
                            <h2>Acessos Disponíveis</h2>
                            <ul>
                                {acessos.map(acesso => (
                                    <li key={acesso.id}>
                                        {acesso.name}
                                        <button className="add-access" onClick={() => handleAddAccessClick(acesso)}>
                                            <FontAwesomeIcon icon={faPlus} /><i className="fa fa-plus"></i>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="selected-access">
                            <h2>Acessos Selecionados</h2>
                            <ul>
                                <TransitionGroup>
                                    {selecteds.map(selected => (
                                        <CSSTransition
                                            key={selected.id}
                                            timeout={300}
                                            classNames="item"
                                        >
                                            <li key={selected.id}>
                                                {selected.name}
                                                <button onClick={() => handleRemoveAccessClick(selected)} className="remove-access"><FontAwesomeIcon icon={faTrash} /><i className="fa fa-trash"></i></button>
                                            </li>
                                        </CSSTransition>
                                    ))}
                                </TransitionGroup>
                            </ul>
                        </div>
                    </div>
                    <button className="submit-button">Solicitar Acesso</button>
                </div>
            </Modal>
        </>
    );
}

export default Requisicoes;
