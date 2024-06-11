import React from "react";
import { Routes, Route} from 'react-router-dom';
import Usuario from "../../pages/usuario/Usuario";
import '../../App.css';
import Footer from "../footer/Footer";


const Navigator = () => {
    return (
      <div className="page-box">
        <Routes>
          <Route path="/" element={<Usuario />} />
          <Route path="/requisitions" element={<Usuario />} />
          <Route path="/request-user" element={<Usuario />} />
          <Route path="/approve-reject" element={<Usuario />} />
        </Routes>
        <Footer />
      </div>
    );
  };

  export default Navigator;