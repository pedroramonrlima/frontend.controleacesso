import React, { useState } from "react";
import "./form.css";

const Form = ({ children }) => {
    const [requiresApproval, setRequiresApproval] = useState(false);

    const handleApprovalChange = (event) => {
        setRequiresApproval(event.target.checked);
    };

    return (
        <>
            <form className="form-box-2">
                <div className="input-field">
                    <label htmlFor="input1">Nome:</label>
                    <input type="text" id="input1" required placeholder=" " />
                </div>
                <div className="input-field">
                    <label htmlFor="input2">DN Grupo ActiveDirectory:</label>
                    <input type="text" id="input2" required placeholder=" " />
                </div>
                <div className="input-field">
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={requiresApproval}
                            onChange={handleApprovalChange}
                        />
                        <span className="slider round"></span>
                    </label>
                    <label htmlFor="approvalSwitch" className="switch-label">
                        Requer aprovação de especialista ?
                    </label>
                </div>
                <div className="btn-box center">
                    <button>Cadastrar</button>
                </div>
            </form>
        </>
    );
};

export default Form;
