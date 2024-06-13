import React from "react";
import Table from "../../components/table";

const Requisicoes = () => {
    const col = ['nome', 'cpf', "rg", 'status',];
    const dados = [
        { nome: 'João', cpf: '123.456.789-00', rg: '987654321' },
        { nome: 'Maria', cpf: '987.654.321-00', rg: '123456789' },
    ];
    return (
        <>
            <div></div>
            <section className="page-box-title">
                <h2>Minhas Requisições</h2>
                <h4>Para o usuário verificar a lista de requisições criadas</h4>
            </section>
            <section className="page-box-container">
                <h1>Conteudo</h1>
                <Table columns={col} data={dados} />
            </section>
        </>
    );
}

export default Requisicoes;