import React from "react";
import Table from "../../components/table";

const Usuario = () => {
    return (
        <>
            <div></div>
            <section className="page-box-title">
                <h2>Solicitação de usuário</h2>
                <h4>Formulário para solicitação de usuário de rede</h4>
            </section>
            <section className="page-box-container">
                <div className="form-group">
                    <label for="cpf">Digite o CPF:</label>
                    <input type="text" id="cpf" value="031.485.012-09" />
                </div>

                <div className="form-box">
                    <div className="input-field">
                        <input type="text" id="input1" required placeholder=" " value="Pedro Ramon Rodrigues Lima" disabled />
                        <label for="input1">Nome Completo</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="input2" required placeholder=" " value="Tecnologia da Informação" disabled />
                        <label for="input2">Departamento</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="input3" required placeholder=" " value="Analista de Sistemas" disabled />
                        <label for="input3">Cargo</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="input4" required placeholder=" " value="Minha Empresa SA" disabled />
                        <label for="input4">Empresa</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="input5" required placeholder=" " value="11 - Tecnologia da Informação" disabled />
                        <label for="input5">Centro de Custo</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="input6" required placeholder=" " value="Matias Maximiano Barreto Corona" disabled />
                        <label for="input6">Gestor</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="input7" required placeholder=" " value="6735" disabled />
                        <label for="input7">Matricula</label>
                    </div>
                </div>
                <div className="btn-box center">
                        <button>Solicitar Acesso</button>
                    </div>
            </section>
        </>
    );
}

export default Usuario;