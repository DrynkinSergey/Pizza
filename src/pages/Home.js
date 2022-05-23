import React, {useEffect, useState} from 'react';

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('https://628aaea77886bbbb37aaa711.mockapi.io/items').then(res => {
            return res.json()
        }).then(
            (json) => {
                setItems(json)
                setLoading(false)
            }
        )
        window.scrollTo(0,0)

    }, [])
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
