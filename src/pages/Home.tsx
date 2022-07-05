import React, {useEffect, useRef} from 'react';


import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import qs from 'qs'


import {list} from '../components/Sort'
import {setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzaSlice";

const Home:React.FC = () => {
    const searching = useRef(false);
    const isMount = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /*Selectors*/
    //@ts-ignore
    const currentPage = useSelector((state) => state.sort.currentPage);
    //@ts-ignore

    const searchString = useSelector((state) => state.sort.searchValue);
    //@ts-ignore

    const selectCategory = useSelector((state) => state.sort.categoryId);
    //@ts-ignore

    const selectedSort = useSelector((state) => state.sort.sort.sortProperty);
    //@ts-ignore

    const {items, status} = useSelector(state => state.pizza);


    const getPizza = async () => {
        const sortBy = selectedSort.replace('-', '');
        const order = selectedSort.includes('-') ? `asc` : 'desc';
        const category = selectCategory > 0 ? `category=${selectCategory}&` : '';
        const search = searchString ? `&search=${searchString}` : '';

            dispatch(
                //@ts-ignore
                fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage
            }))

        window.scrollTo(0, 0)
    }

    useEffect(() => {
        getPizza();
        if (window.location.search) {

            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find((obj) => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            )
            searching.current = true;
        }
    }, [])

    useEffect(() => {
        searching.current ? searching.current = false : getPizza();
    }, [selectCategory, selectedSort, searchString, currentPage])

    useEffect(() => {
        if (isMount.current) {
            const queryString = qs.stringify({
                sortProperty: selectedSort,
                categoryId: selectCategory,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMount.current = true
    }, [selectCategory, selectedSort, searchString, currentPage]);


    const onPageClick = (index:number) => {
        dispatch(setCurrentPage(index))
    }
    const pizzas = items.filter((obj:any) => obj.title.toLowerCase().includes(searchString.toLowerCase())
    ).map((item:any) => (
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
                    status === 'loading' ? [...new Array(8)].map((item, index) => <Skeleton
                            key={index}/>) :
                        searchString ? pizzas :
                            items.map((item:any) =>
                                    <PizzaBlock key={item.id} {...item}/>

                            )
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={(index:number) => onPageClick(index)}/>
        </div>
    );
};

export default Home;
