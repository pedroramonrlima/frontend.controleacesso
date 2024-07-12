import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { req } from "../../interceptors"
import { useAccount } from "../../hooks/useAccount";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const col = [
    { key: 'id', alias: 'Código' },
    { key: 'item', alias: 'Item' },
    { key: 'requestName', alias: 'Quem solicitou' },
    { key: 'status', alias: 'Status' }
];

const Aprovacao = () => {
    const user = useAccount();
    const [requestsEspecialis, setRequestsEspecialis] = useState([]);

    useEffect(() => {
        async function loadAcesseRequestEspecialist() {
            try {
                const { data } = await req.get("Approval/list-especialist");
                let dados = data.map(item => ({
                    id: item.id,
                    item: item.acesseRequest.groupAd.name,
                    requestName: item.acesseRequest.employee.name,
                    status: item.status.name
                }));
                //console.log("teste",dados);
                setRequestsEspecialis(dados);
            } catch (e) {
                console.log(e);
            }
        }
        loadAcesseRequestEspecialist();
    }, [])

    const handleApprove = (id) => {
        console.log(`Approved request with id ${id}`);
    };

    const handleReject = (id) => {
        console.log(`Rejected request with id ${id}`);
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
                    <div className="btn-box-table">
                        <a onClick={() => handleApprove(requestsEspecialis.id)}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </a>
                        <a onClick={() => handleReject(requestsEspecialis.id)}>
                            <FontAwesomeIcon icon={faThumbsDown} />
                        </a>
                    </div>
                </Table>
            </section>
        </>
    );
}

export default Aprovacao;