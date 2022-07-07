import React, {useEffect, useRef} from 'react';


import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";

import {useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import qs from 'qs'


import {list} from '../components/Sort'
import { setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, SearchPizzasParams} from "../redux/slices/pizzaSlice";
import {RootState, useAppDispatch} from "../redux/store";

const Home: React.FC = () => {
    const searching = useRef(false);
    const isMount = useRef(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    /*Selectors*/
    const currentPage = useSelector((state: RootState) => state.sort.currentPage);
    const searchString = useSelector((state: RootState) => state.sort.searchValue);
    const selectCategory = useSelector((state: RootState) => state.sort.categoryId);
    const categoryId = useSelector((state: RootState) => state.sort.categoryId)
    const selectedSort = useSelector((state: RootState) => state.sort.sort.sortProperty);
    const {items, status} = useSelector((state: RootState) => state.pizza);

    const getPizza = async () => {
        const sortBy = selectedSort.replace('-', '');
        const order = selectedSort.includes('-') ? `asc` : 'desc';
        const category = selectCategory > 0 ? `category=${selectCategory}&` : '';
        const search = searchString ? `&search=${searchString}` : '';

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage)
            }))

        window.scrollTo(0, 0)
    }

    useEffect(() => {
        dispatch(fetchPizzas({} as SearchPizzasParams));
        if (window.location.search) {

            const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzasParams;
            const sort = list.find((obj) => obj.sortProperty === params.sortBy)

            dispatch(setFilters({
                searchValue:params.search,
                categoryId:Number(params.category),
                currentPage:Number(params.currentPage),
                sort: sort || list[0],
            }));
        }
        searching.current = true;

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


    const onPageClick = (index: number) => {
        dispatch(setCurrentPage(index))
    }
    const pizzas = items.filter((obj: any) => obj.title.toLowerCase().includes(searchString.toLowerCase())
    ).map((item: any) => (
        <PizzaBlock key={item.id} {...item}/>
    ));
    const onChangeCategory = (index: number) => {
        dispatch(setCategoryId(index))
    }

    return (
        <div className='container'>
            <div className="content__top">
                <Categories categoryId={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    status === 'loading' ? [...new Array(8)].map((item, index) => <Skeleton
                            key={index}/>) :
                        searchString ? pizzas :
                            items.map((item: any) =>
                                <PizzaBlock key={item.id} {...item}/>
                            )
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={(index: number) => onPageClick(index)}/>
        </div>
    );
};

export default Home;
