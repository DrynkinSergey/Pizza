import React, {useEffect, useState} from 'react';

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)

    const [sortId, setSortId] = useState(
        {
            name: 'популярности', sortProperty: 'rating'
        }
    )

    const [categoryId, setCategoryId] = useState(0)

    const sortBy=sortId.sortProperty.replace('-','');
    const order=sortId.sortProperty.includes('-')?`asc`:'desc';
    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const baseUrl = 'https://628aaea77886bbbb37aaa711.mockapi.io/items?';
    useEffect(() => {
        fetch(`${baseUrl}${category}sortBy=${sortBy}&order=${order}`).then(res => {
            return res.json()
        }).then(
            (json) => {
                setItems(json)
                setLoading(false)
            }
        )
        window.scrollTo(0, 0)

    }, [categoryId,sortId])
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
                        key={index}/>) : items.map(item => (
                            <PizzaBlock key={item.id} {...item}/>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default Home;
