import React, {useEffect, useState} from 'react';

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import {Context} from "../App";

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const [currentPage,setCurrentPage] = useState(1)
    const [categoryId, setCategoryId] = useState(0)

    const [sortId, setSortId] = useState(
        {
            name: 'популярности', sortProperty: 'rating'
        }
    )

    const {searchValue} = React.useContext(Context)

    const sortBy=sortId.sortProperty.replace('-','');
    const order=sortId.sortProperty.includes('-')?`asc`:'desc';
    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const search = searchValue  ? `&search=${searchValue}` : '';

    const baseUrl = 'https://628aaea77886bbbb37aaa711.mockapi.io/items?';


    useEffect(() => {
        fetch(`${baseUrl}page=${currentPage}&limit=8&${category}sortBy=${sortBy}&order=${order}${search}`).then(res => {
            return res.json()
        }).then(
            (json) => {
                setItems(json)
                setLoading(false)
            }
        )
        window.scrollTo(0, 0)

    }, [categoryId,sortId,searchValue,currentPage])
    const pizzas = items.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase())
    ).map(item => (
        <PizzaBlock key={item.id} {...item}/>
    ))
    return (
        <div className='container'>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>
                <Sort value={sortId} onChangeSort={(prop)=>setSortId(prop)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    loading ? [...new Array(8)].map((item, index) => <Skeleton
                        key={index}/>) :
                        searchValue? pizzas:
                        items.map(item => (
                            <PizzaBlock key={item.id} {...item}/>
                        )
                    )
                }
            </div>
            <Pagination onChangePage={(number)=>setCurrentPage(number)}/>
        </div>
    );
};

export default Home;
