import React, {useEffect, useRef, useState} from 'react';


import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate}  from 'react-router-dom';
import qs from 'qs'

import axios from "axios";
import {list} from '../components/Sort'
import {setCurrentPage, setFilters} from "../redux/slices/filterSlice";

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const searching = useRef(false);
    const isMount = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /*Selectors*/

    const currentPage = useSelector((state) => state.sort.currentPage);
    const searchString = useSelector((state) => state.sort.searchValue);
    const selectCategory = useSelector((state) => state.sort.categoryId);
    const selectedSort = useSelector((state) => state.sort.sort.sortProperty);



    const fetchPizzas = () => {
        const baseUrl = 'https://628aaea77886bbbb37aaa711.mockapi.io/items?';

        const sortBy = selectedSort.replace('-', '');
        const order = selectedSort.includes('-') ? `asc` : 'desc';
        const category = selectCategory > 0 ? `category=${selectCategory}&` : '';
        const search = searchString ? `&search=${searchString}` : '';
        setLoading(true)
        axios.get(`${baseUrl}page=${currentPage}&limit=8&${category}sortBy=${sortBy}&order=${order}${search}`).then(
            (res) => {
                setItems(res.data)
                setLoading(false)
            }
        )
        window.scrollTo(0, 0)
    }

    useEffect(()=> {
        fetchPizzas();
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find((obj) => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            )
            searching.current= true;
        }
    },[])

    useEffect(() => {
        searching.current? searching.current = false :     fetchPizzas();
    }, [selectCategory, selectedSort, searchString, currentPage])

    useEffect(() => {
            if(isMount.current){
                const queryString = qs.stringify({
                    sortProperty : selectedSort,
                    categoryId: selectCategory,
                    currentPage,
                })
                navigate(`?${queryString}`)
            }
            isMount.current = true
    }, [selectCategory, selectedSort, searchString, currentPage]);


    const onPageClick = number => {
        dispatch(setCurrentPage(number))
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
