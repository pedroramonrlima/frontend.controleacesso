import React, { useState, useEffect } from "react";
import Table from "../../components/table";
import Modal from "../../components/modal/Modal";
import Alert from "../../components/alert/Alert";
import { faSearch, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {req} from "../../interceptors"
import { useAccount } from "../../hooks/useAccount";
import "./Requisicao.css"

const columns = [
    { key: 'id', alias: 'Código' },
    { key: 'item', alias: 'Item' },
    { key: 'requestName', alias: 'Quem solicitou' },
    { key: 'status', alias: 'Status' },
];

const Requisicoes = () => {
    const user = useAccount();
    const [acesseRequets, setAcesseRequets] = useState([]);
    const [groups,setGroups] = useState([]);
    const [selecteds, setSelecteds] = useState([]);
    const [animationClasses, setAnimationClasses] = useState({});
    const [acessFilter, setAcessFilter] = useState([]);
    const [filter, setFilter] = useState({pesquisa:"Pesquise"});
    const [showModal, setShowModal] = useState(false);
    const [sync, setSync] = useState(false);
    const [alert, setAlert] = useState({ message: "", errors: [], type: "" }); 

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
            const filterAcesso = groups.filter(group => 
                group.name.toLowerCase().includes(value.toLowerCase()));

            // Atualiza o estado dos acessos filtrados
            setAcessFilter(filterAcesso);
    
            return updatedFilter;
        });
    };

    async function onSubmit(){
        let requests = {
            groupAds: selecteds
        };
        console.log("Clicksss",requests);

        try {
            const {data} = await req.post("AcesseRequest", requests);
            console.log();
            setSelecteds([]);
            setShowModal(false);
            setSync(!sync);
            if(data.errors) {
                setAlert({
                    message: "A requisição foi gerada, porém alguns itens não foram criados devido aos seguintes problemas:",
                    errors: data.errors,
                    type: "warning"
                  }); 
            }else {
                setAlert({ message: "Requisição enviada com sucesso!", type: "success" });
            }
        } catch (error) {
            console.log(error);
            const {errors} = error.response.data;
            console.log("RETORNO ERRO ",errors);
            if(errors.every(item => typeof item === 'string')){
                setAlert({
                    message: "Erro ao enviar requisição",
                    errors: errors,
                    type: "error"
                  }); 
            }else if(errors){
                const mapErrors = errors.map(item => item.errorMessage);
                setAlert({
                    message: "Erro ao enviar requisição",
                    errors: mapErrors,
                    type: "error"
                  }); 
            }else {
                setAlert({ 
                    message: "Erro ao enviar requisição", 
                    errors:["Ouve algum erro ao tentar enviar a requisição, entre em contato com o administrador do sistema"],
                    type: "success" 
                });
            }

            setSelecteds([]);
            setShowModal(false);
        }
    }
    //console.log(filter);
    useEffect(() => {
        async function loadAcesseRequest() {
            try {
                const {data} = await req.get("AcesseRequest");
                let dados = data.map(item => ({
                    id: item.id,
                    item: item.acesseRequest.groupAd.name,
                    requestName: item.requesterEmployee.name,
                    status: item.status.name,
                }));
                return(dados);

            } catch (e) {
                throw e;
            }
        }

        async function loadGroup() {
            try {
                const {data} = await req.get("Group");
                return (data)

            } catch (e) {
                throw e;
            }
        }

        async function loadDefaultData() {
            try {
                const [request, group] = await Promise.all([loadAcesseRequest(), loadGroup()]);
                setAcesseRequets(request);
                setAcessFilter(group);
                setGroups(group);
            } catch (e) {
                console.log(e);
                if (e.response.status === 401) {
                    //navigate("/");
                    setAlert({ message: "Erro de autenticacao", type: "error" });
                }
            }
        }
        loadDefaultData();
    }, [sync])
    
    const closeAlert = () => {
        setAlert({ message: "", errors: [], type: "" });
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

                <Table columns={columns} data={acesseRequets} />
            </section>
            <Alert message={alert.message} errors={alert.errors} type={alert.type} onClose={closeAlert} />

            <Modal show={showModal} onClose={closeModal}>
                <div className="container-requisicao">
                    {/* <h1>Requisição de Acesso</h1> */}
                    <div className="user-info">
                        <div className="info">
                            <label htmlFor="usuario">Usuário:</label>
                            <span id="usuario">{user.login}</span>
                        </div>
                        <div className="info">
                            <label htmlFor="nome-completo">Nome Completo:</label>
                            <span id="nome-completo">{user.name}</span>
                        </div>
                        <div className="info">
                            <label htmlFor="funcao">Função:</label>
                            <span id="funcao">{user.title}</span>
                        </div>
                        <div className="info">
                            <label htmlFor="gestor">Gestor:</label>
                            <span id="gestor">{user.manager}</span>
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
                    <button onClick={()=> onSubmit()} className="submit-button">Solicitar Acesso</button>
                </div>
            </Modal>
        </>
    );
}

export default Requisicoes;
