import React, { useState } from "react";
import Table from "../../../components/table";
import Modal, { ModalSmall } from "../../../components/modal/Modal";
import { faSearch, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../../components/form/Form";
// import "./grupo.css"

const Grupo = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const col = [
        { key: 'id', alias: 'id' },
        { key: 'name', alias: 'Nome' },
        { key: 'dn', alias: 'DN Active Directory' },
        { key: 'action', alias: 'ação' },
    ];
    const dados = [
        {
            id: 1,
            name: "DEVICE_ALL",
            dn: "OU=GRUPOS,CN=MEUDOMINIO,CN=COM"
        }
    ];
    return (
        <>
            <div></div>
            <section className="page-box-title">
                <h2>Grupos</h2>
                <h4>Cadastro de Grupos do Active Directory no sistema de acesso.</h4>
            </section>
            <section className="page-box-container">
                <div className="btn-box btn-box-right">
                    <button onClick={openModal}>Cadastrar</button>
                </div>
                <Table columns={col} data={dados} />
            </section>
            <Modal show={showModal} onClose={closeModal} title="Cadastrar Grupo" small >
                <Form />
            </Modal>
        </>
    );
}

export default Grupo;