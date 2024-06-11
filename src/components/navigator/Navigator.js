import React from "react";
import { Routes, Route} from 'react-router-dom';
import Usuario from "../../pages/usuario/Usuario";
import '../../App.css';
import Footer from "../footer/Footer";
import Requisicoes from "../../pages/requisicoes/Requisicoes";
import Dashboard from "../../pages/dashboard/Dashboard";
import Aprovacao from "../../pages/aprovacao/Aprovacao";


const Navigator = () => {
    return (
      <div className="page-box">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/requisicao-acesso" element={<Requisicoes />} />
          <Route path="/solicitacao-usuario" element={<Usuario />} />
          <Route path="/aprovacao-reprovacao" element={<Aprovacao />} />
        </Routes>
        <Footer />
      </div>
    );
  };

  export default Navigator;