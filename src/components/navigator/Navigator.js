import React from "react";
import { Outlet } from 'react-router-dom';
import '../../App.css';
import Footer from "../footer/Footer";

const Navigator = () => {
  return (
    <div className="page-box">
      <Outlet />
      <Footer />
    </div>
  );
};

export default Navigator;
