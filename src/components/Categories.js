import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeCategory} from "../redux/slices/filterSlice";

const Categories = () => {
    const dispatch = useDispatch()
    const selectCategory = useSelector((state) => state.category.index)

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
                               onClick={() =>dispatch(changeCategory(item.id))}
                               className={selectCategory === item.id ? 'active' : ''}
                    >{item.title}</li>
                })}
            </ul>
        </div>

    );
};

export default Categories;
