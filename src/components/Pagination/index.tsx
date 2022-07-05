import React from 'react';
import styles from './pagination.module.scss'
import ReactPaginate from "react-paginate";
import {useSelector} from "react-redux";

type PaginationProps = {
    onChangePage:(i:number)=>void,
    currentPage:number;
}

const Pagination:React.FC<PaginationProps> = ({onChangePage,currentPage}) => {    //@ts-ignore

    const {items} = useSelector(state => state.pizza)
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected+1)}
            pageRangeDisplayed={4}
            pageCount={items.length !== 8 && currentPage !== 2 ? 0 : 2}
            previousLabel="<"/*
            renderOnZeroPageCount={null}*/
            forcePage={currentPage-1}

        />
    );
};

export default Pagination;
