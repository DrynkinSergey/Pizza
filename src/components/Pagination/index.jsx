import React from 'react';
import styles from './pagination.module.scss'
import ReactPaginate from "react-paginate";

const Pagination = ({onChangePage}) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected+1)}
            pageRangeDisplayed={4}
            pageCount={2}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
