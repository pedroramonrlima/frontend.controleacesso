import React, { useState } from "react";
import "./form.css"

const Form = ({ children }) => {


    return (
        <>
            <form className="form-box-2">
  
                <div className="input-field">
                    <label for="input1">Nome:</label>
                    <input type="text" id="input1" required placeholder=" " />
                </div>
                <div className="input-field">
                    <label for="input2">DN Grupo ActiveDirectory:</label>
                    <input type="text" id="input2" required placeholder=" " />
                </div>           
            <div className="btn-box center">
                <button>Cadastrar</button>
            </div>
            </form>
        </>
    );
}

export default Form