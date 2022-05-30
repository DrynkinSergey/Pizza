import React, {useEffect, useState} from 'react';


import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {onPageChange} from "../redux/slices/filterSlice";

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    /*Selectors*/
    const currentPage = useSelector((state) => state.category.currentPage)
    const searchString = useSelector((state) => state.search.searchString)
    const selectCategory = useSelector((state) => state.category.index)
    const selectedSort = useSelector((state) => state.sort.sortProperty)

    const sortBy = selectedSort.replace('-', '');
    const order = selectedSort.includes('-') ? `asc` : 'desc';
    const category = selectCategory > 0 ? `category=${selectCategory}&` : '';
    const search = searchString ? `&search=${searchString}` : '';

    const baseUrl = 'https://628aaea77886bbbb37aaa711.mockapi.io/items?';


    useEffect(() => {
        axios.get(`${baseUrl}page=${currentPage}&limit=8&${category}sortBy=${sortBy}&order=${order}${search}`).then(
            (res) => {
                setItems(res.data)
                setLoading(false)
            }
        )
        window.scrollTo(0, 0)
    }, [selectCategory, selectedSort, searchString, currentPage])

    const onPageClick = number => {
        dispatch(onPageChange(number))
    }
    const pizzas = items.filter(obj => obj.title.toLowerCase().includes(searchString.toLowerCase())
    ).map(item => (
        <PizzaBlock key={item.id} {...item}/>
    ));
    return (
        <div className='container'>
            <div className="content__top">

                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    loading ? [...new Array(8)].map((item, index) => <Skeleton
                            key={index}/>) :
                        searchString? pizzas:
                            items.map(item => (
                                    <PizzaBlock key={item.id} {...item}/>
                                )
                            )
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={(number) => onPageClick(number)}/>
        </div>
    );
};

export default Home;
