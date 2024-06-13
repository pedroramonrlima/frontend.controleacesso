import React from "react";
import './Table.css';

const Table = ({ columns, data }) => {
    if (!data || data.length === 0) {
        return <div>Nenhum dado disponível.</div>;
    }
    console.log(columns);
    console.log(data);
    return (
        <div className="table-container">
            <table className="styled-table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((chave, cellIndex) => (
                                <td key={`${rowIndex}-${chave}`}>{item[chave]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
