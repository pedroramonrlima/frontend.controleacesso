import React from "react";
import Table from "../../components/table";

const Aprovacao = () => {
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
                <h2>Aprovação e Reprovação de Acesso</h2>
                <h4>Permite o usuário aprovar e reprovar solicitações de acesso de sua responsabilidade</h4>
            </section>
            <section className="page-box-container">
                <Table columns={col} data={dados} />
            </section>
        </>
    );
}

export default Aprovacao;