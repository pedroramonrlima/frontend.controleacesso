import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import { req } from '../../interceptors';
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../../contexts/AuthContext';
import "./login.css";

const Login = () => {
    //const feedback = useFeedback();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const { login, logout } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const auth = await req.post('Authenticate', credentials);
            const { token } = auth.data;
            localStorage.setItem('token', token);
            const dataFromToken = jwtDecode(token);
            if (dataFromToken) {
                const employee = JSON.parse(dataFromToken.Employee);
                if (employee){
                    login(employee);
                    navigate("/app");
                }else {
                    throw new Error('Autenticação não está funcionando!');
                }
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data);
                /*feedback.showFeedback({
                    severity: 'error',
                    message: e.response?.data?.error,
                });*/
            } else {
                console.log(e);
                /*
                feedback.showFeedback({
                    severity: 'error',
                    message: `${e.message}. Tente novamente mais tarde ou entre em contato com o Administrador`,
                });*/
            }
        }
    }
    function onChangeInput(event) {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    }

    useEffect(() => {
        async function removeTokenIfExists() {
            const token = localStorage.getItem('token');
            if (token) {
                localStorage.removeItem('token');
            }
        }
        removeTokenIfExists();
        logout();
    }, []);

    return (
        <div class="container-login">
            <div class="left"></div>
            <div class="login-box">
                <img src={Logo} alt="Logo" />
                <h2>Autenticação</h2>
                <p>Sistema de solicitação de acessos</p>
                <form onSubmit={handleSubmit}>
                    <input name="login" type="text" placeholder="Usuário" required onChange={onChangeInput} />
                    <input name="password" type="password" placeholder="Senha" required onChange={onChangeInput} />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;