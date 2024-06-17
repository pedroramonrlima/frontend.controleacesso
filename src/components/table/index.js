import React, { useState, useEffect } from "react";
import './Table.css';
import { faArrowDownShortWide, faArrowUpShortWide, faFilter, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Table = ({ columns, data, itemsPerPage = 10  }) => {
    // State variables to manage filtering, sorting, and filtered data
    const [filterColumn, setFilterColumn] = useState(null); // Coluna atualmente selecionada para filtragem
    const [filterValue, setFilterValue] = useState(""); // Valor do filtro atual inserido pelo usuário
    const [filteredData, setFilteredData] = useState(data); // Versão filtrada dos dados originais
    const [sortColumn, setSortColumn] = useState(null); // Coluna atualmente ordenada
    const [sortDirection, setSortDirection] = useState(null); // Direção de ordenação atual ('asc' ou 'desc')

    // Estado para controle de paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(data.length / itemsPerPage));

    // Atualizar o total de páginas quando os dados filtrados mudarem
    useEffect(() => {
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    }, [filteredData, itemsPerPage]);

    // Função para mudar de página
    const changePage = (page) => {
        setCurrentPage(page);
    };

    // Função para avançar para a próxima página
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Função para voltar para a página anterior
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Índices dos dados a serem exibidos na página atual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Function to handle filter column click
    const handleFilterClick = (column) => {
        if (filterColumn === column) {
            // Limpar filtro se a coluna clicada já for a coluna de filtro selecionada
            setFilterColumn(null);
            setFilterValue("");
            setFilteredData(data);
        } else {
            // Definir a coluna clicada como a nova coluna de filtro e redefinir os valores de filtro
            setFilterColumn(column);
            setFilterValue("");
            setFilteredData(data);
        }
    };

    // Function to handle filter input change
    const handleFilterChange = (e) => {
        const value = e.target.value; // Obter o valor do filtro inserido
        setFilterValue(value); // Atualizar o estado filterValue

        // Filtrar dados com base na coluna de filtro selecionada e no valor inserido
        const filtered = data.filter((item) =>
            item[filterColumn].toString().toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered); // Atualizar o estado filteredData com os resultados filtrados
    };

    // Function to handle sort column click
    const handleSortClick = (column) => {
        let newSortDirection = 'asc'; // Direção de ordenação padrão

        if (sortColumn === column) {
            // Inverter a direção de ordenação se a coluna clicada já for a coluna ordenada
            newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        }

        setSortColumn(column); // Atualizar o estado sortColumn com a coluna clicada
        setSortDirection(newSortDirection); // Atualizar o estado sortDirection com a nova direção

        // Classificar os dados filtrados com base na coluna e direção de ordenação atuais
        const sorted = [...filteredData].sort((a, b) => {
            if (a[column] < b[column]) return newSortDirection === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return newSortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredData(sorted); // Atualizar o estado filteredData com os resultados ordenados
    };

    // Renderizar apenas os dados da página atual
    const currentData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="table-container">
            <table className="styled-table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>
                                <div className="header-content">
                                    <FontAwesomeIcon
                                        icon={filterColumn === column ? faFilterCircleXmark : faFilter}
                                        className="filter-icon"
                                        onClick={() => handleFilterClick(column)}
                                    />
                                    <span className="column-name" onClick={() => handleSortClick(column)}>
                                        {column.toUpperCase()}
                                    </span>
                                    {sortColumn === column && (
                                        <FontAwesomeIcon
                                            icon={sortDirection === 'asc' ? faArrowUpShortWide : faArrowDownShortWide}
                                            className="sort-icon"
                                        />
                                    )}
                                </div>
                                {filterColumn === column && (
                                    <input
                                        type="text"
                                        value={filterValue}
                                        onChange={handleFilterChange}
                                        className="filter-input"
                                        placeholder={`Filtrar por ${column}`}
                                    />
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((chave, cellIndex) => (
                                <td key={`${rowIndex}-${chave}`}>{item[chave]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <span>{currentPage} de {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>Próxima</button>
            </div>
        </div>
    );
}

export default Table;
