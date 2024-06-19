import React from "react";
import Table from "../../../components/table";

const Grupo = () => {
    const col = ["id", "usuario","items","Ação"]
    const dados = [
        {
        id: 1,
        usuario: "Pedro Ramon Rodrigues Lima",
        items: "DEVICE_ALL / VPN / VPN-TI"
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
                <Table columns={col} data={dados} />
            </section>
        </>
    );
}

export default Grupo;