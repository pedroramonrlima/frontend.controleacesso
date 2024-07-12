import React, { useState, useEffect } from "react";
import './Table.css';
import { faArrowDownShortWide, faArrowUpShortWide, faFilter, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Table = ({ columns, data, itemsPerPage = 10, children }) => {
    const [filterColumn, setFilterColumn] = useState(null);
    const [filterValue, setFilterValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (filteredData.length > 0) {
            setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
        } else {
            setTotalPages(1);
        }
    }, [filteredData, itemsPerPage]);

    useEffect(() => {
        if (data) {
            setFilteredData(data);
        }
    }, [data]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFilterClick = (column) => {
        if (filterColumn === column.key) {
            setFilterColumn(null);
            setFilterValue("");
            setFilteredData(data);
        } else {
            setFilterColumn(column.key);
            setFilterValue("");
            const filtered = data.filter(item => item[column.key] && item[column.key].toString().toLowerCase().includes(filterValue.toLowerCase()));
            setFilteredData(filtered);
        }
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterValue(value);
        const filtered = data.filter((item) =>
            item[filterColumn].toString().toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleSortClick = (column) => {
        let newSortDirection = 'asc';
        if (sortColumn === column.key) {
            newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        }
        setSortColumn(column.key);
        setSortDirection(newSortDirection);

        const sorted = [...filteredData].sort((a, b) => {
            if (a[column.key] < b[column.key]) return newSortDirection === 'asc' ? -1 : 1;
            if (a[column.key] > b[column.key]) return newSortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredData(sorted);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    if (!columns || columns.length === 0 || !currentData || currentData.length === 0) {
        return null;
    }

    return (
        <div className="table-container">
            <div className="styled-table">
                <div className="table-header">
                    {columns.map((column, index) => (
                        <div className="header-cell" key={index}>
                            <div className="header-content">
                                <FontAwesomeIcon
                                    icon={filterColumn === column.key ? faFilterCircleXmark : faFilter}
                                    className="filter-icon"
                                    onClick={() => handleFilterClick(column)}
                                />
                                <span className="column-name" onClick={() => handleSortClick(column)}>
                                    {column.alias.toUpperCase()}
                                </span>
                                {sortColumn === column.key && (
                                    <FontAwesomeIcon
                                        icon={sortDirection === 'asc' ? faArrowUpShortWide : faArrowDownShortWide}
                                        className="sort-icon"
                                    />
                                )}
                            </div>
                            {filterColumn === column.key && (
                                <input
                                    type="text"
                                    value={filterValue}
                                    onChange={handleFilterChange}
                                    className="filter-input"
                                    placeholder={`Filtrar por ${column.alias}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="table-body">
                    {currentData.map((item, rowIndex) => (
                        <div className="table-row" key={rowIndex}>
                            {columns.map((column, cellIndex) => (
                                <div className="table-cell" key={`${rowIndex}-${column.key}`}>
                                    {item[column.key]}
                                </div>
                            ))}
                            <div className="table-cell">
                                {React.Children.map(children, (child) =>
                                    React.cloneElement(child, { id: item.id })
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <span>{currentPage} de {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>Próxima</button>
            </div>
        </div>
    );
}

export default Table;
