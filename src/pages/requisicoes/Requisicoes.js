import React, { useState } from "react";
import Table from "../../components/table";
import Dados, { acessos } from "./dados"
import Modal from "../../components/modal/Modal";
import { faSearch, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Requisicao.css"

const Requisicoes = () => {
    const [selecteds, setSelecteds] = useState([]);
    const [animationClasses, setAnimationClasses] = useState({});
    const [acessFilter, setAcessFilter] = useState(acessos);
    const [filter, setFilter] = useState({pesquisa:"Pesquise"});
    const col = ['nome', 'cpf', "rg", 'status',];
    const dados = Dados;
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleAddAccessClick = (acesso) => {
        if (!selecteds.some(item => item.id === acesso.id)) {
            setAnimationClasses(prev => ({ ...prev, [acesso.id]: 'fadeIn' }));
            setSelecteds([...selecteds, acesso]);
        }
    };

    const handleRemoveAccessClick = (acesso) => {
        setAnimationClasses(prev => ({ ...prev, [acesso.id]: 'fadeOut' }));
        setTimeout(() => {
            setSelecteds(selecteds.filter(item => item.id !== acesso.id));
            setAnimationClasses(prev => {
                const newClasses = { ...prev };
                delete newClasses[acesso.id];
                return newClasses;
            });
        }, 500);
    };

    const handleSearchChange = (event) => {
        const { name, value } = event.target;
        
        // Atualiza o filtro
        setFilter(prevFilter => {
            const updatedFilter = { ...prevFilter, [name]: value };
            
            // Filtra os acessos com base no valor atualizado do filtro
            const filterAcesso = acessos.filter(acesso => 
                acesso.name.toLowerCase().includes(value.toLowerCase()));
            
            // Atualiza o estado dos acessos filtrados
            setAcessFilter(filterAcesso);
    
            return updatedFilter;
        });
    };
    console.log(filter);

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
                            <input type="text" name="pesquisa" id="pesquisa" onChange={handleSearchChange} placeholder="Pesquise por nome do grupo" />
                            <button><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                    </div>
                    <div className="access-section">
                        <div className="available-access">
                            <h2>Acessos Disponíveis</h2>
                            <ul>
                                {acessFilter.map(acesso => (
                                    <li key={acesso.id} className="fadeIn">
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
                                {selecteds.map(selected => (
                                    <li key={selected.id} className={animationClasses[selected.id]}>
                                        {selected.name}
                                        <button onClick={() => handleRemoveAccessClick(selected)} className="remove-access"><FontAwesomeIcon icon={faTrash} /><i className="fa fa-trash"></i></button>
                                    </li>
                                ))}
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
