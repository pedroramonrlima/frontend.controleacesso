import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import "./login.css";

const Login = () => {

    return (
        <div class="container-login">
            <div class="left"></div>
            <div class="login-box">
                <img src={Logo} alt="Logo"/>
                <h2>Autenticação</h2>
                <p>Sistema de solicitação de acessos</p>
                <form>
                    <input type="text" placeholder="Usuário" required />
                    <input type="password" placeholder="Senha" required />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;