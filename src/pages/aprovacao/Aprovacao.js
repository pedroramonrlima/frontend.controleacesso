import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { req } from "../../interceptors"
import { useAccount } from "../../hooks/useAccount";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "../../components/alert/Alert";
import "./aprovacao.css";

const col = [
    { key: 'id', alias: 'Código' },
    { key: 'item', alias: 'Item' },
    { key: 'requestName', alias: 'Quem solicitou' },
    { key: 'status', alias: 'Status' },
];

const Aprovacao = () => {
    const user = useAccount();
    const [requestsEspecialis, setRequestsEspecialis] = useState([]);
    const [sync, setSync] = useState(false);
    const [alert, setAlert] = useState({ message: "", errors: [], type: "" }); 


    useEffect(() => {
        async function loadAcesseRequestEspecialist() {
            try {
                const { data } = await req.get("Approval/list-especialist");
                let dados = data.map(item => ({
                    id: item.id,
                    item: item.acesseRequest.groupAd.name,
                    requestName: item.acesseRequest.employee.name,
                    status: item.status.name,
                    statusId: item.statusRequestId
                }));
                //console.log("teste",dados);
                return dados;
            } catch (e) {
                console.log(e);
                if(e.response.status ===401){
                    //navigate("/");
                    setAlert({ message: "Erro de autenticacao", type: "error" });
                }
            }
        }
        async function loadAcesseRequestManager() {
            try {
                const { data } = await req.get("Approval/list-manager");
                let dados = data.map(item => ({
                    id: item.id,
                    item: item.acesseRequest.groupAd.name,
                    requestName: item.acesseRequest.employee.name,
                    status: item.status.name,
                    statusId: item.statusRequestId
                }));
                //console.log("manager",data);
                //console.log("teste",dados);
                return dados;
            } catch (e) {
                console.log(e);
                if(e.response.status ===401){
                    //navigate("/");
                    setAlert({ message: "Erro de autenticacao", type: "error" });
                }
            }
        }

        async function loadDefaultData() {
            try {
              const [especialists, managers] = await Promise.all([loadAcesseRequestEspecialist(), loadAcesseRequestManager()]);
              let requests = [...especialists, ...managers];
              setRequestsEspecialis(requests);
            } catch(e) {
              console.log(e);
            }
        }

        loadDefaultData();
    }, [sync])

    async function handleApprove(id){
        try {
            let request = {...requestsEspecialis.find(request => request.id === id),isApproved:true}
            console.log("requisição", request);
            if(request.statusId === 1){
                console.log(await req.post("Approval/approve-manager", request));
            }else {
                console.log(await req.post("Approval/approve-especialista", request));
            }

            setSync(!sync);
            setAlert({ message: `Requisição ${id} foi aprovada!`, type: "success" });
        }catch(e){
            console.log(e);
        }
    };

    async function handleReject(id){
        try {
            let request = {...requestsEspecialis.find(request => request.id === id),isApproved:false}
            if(request.statusId === 1){
                console.log(await req.post("Approval/approve-manager", request));
            }else {
                console.log(await req.post("Approval/approve-especialista", request));
            }
            setSync(!sync);
            setAlert({ message: `Requisição ${id} foi reprovada!`, type: "success" });
        }catch(e){
            console.log(e);
        }
    };

    console.log(requestsEspecialis);
    const closeAlert = () => {
        setAlert({ message: "", errors: [], type: "" });
      };

    return (
        <>
            <div></div>
            <section className="page-box-title">
                <h2>Aprovação e Reprovação de Acesso</h2>
                <h4>Permite o usuário aprovar e reprovar solicitações de acesso de sua responsabilidade</h4>
            </section>
            <section className="page-box-container">
                <Table columns={col} data={requestsEspecialis}>
                    {({ id }) => (
                        <div className="btn-box-table">
                            <a onClick={() => handleApprove(id)} className="btn-approve">
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </a>
                            <a onClick={() => handleReject(id)} className="btn-reject">
                                <FontAwesomeIcon icon={faThumbsDown} />
                            </a>
                        </div>
                    )}
                </Table>
            </section>
            <Alert message={alert.message} errors={alert.errors} type={alert.type} onClose={closeAlert} />

        </>
    );
}

export default Aprovacao;