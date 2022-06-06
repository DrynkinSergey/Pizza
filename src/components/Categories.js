import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../redux/slices/sortSlice";

const Categories = () => {
    const dispatch = useDispatch()
    const categoryId = useSelector((state) => state.sort.categoryId)

    const categories = [
        {
            id: 0,
            title: 'Все'
        },
        {
            id: 1,
            title: 'Мясные'
        },
        {
            id: 2,
            title: 'Вегетарианская'
        },
        {
            id: 3,
            title: 'Гриль'
        },
        {
            id: 4,
            title: 'Острые'
        },
        {
            id: 5,
            title: 'Закрытые'
        },
    ]
    return (
        <div className="categories">
            <ul>
                {categories.map(item => {
                    return <li key={item.id}
                               onClick={() =>dispatch(setCategoryId(item.id))}
                               className={categoryId === item.id ? 'active' : ''}
                    >{item.title}</li>
                })}
            </ul>
        </div>

    );
};

export default Categories;
