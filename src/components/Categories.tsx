import React, {memo} from 'react';
import { useSelector} from "react-redux";

type CategoriesProps = {
    onChangeCategory: (id:number)=> void;
    categoryId:number;
}

const Categories:React.FC<CategoriesProps> = memo(({onChangeCategory,categoryId}) => {
    console.log('render')
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
                               onClick={()=>onChangeCategory(item.id)}
                               className={categoryId === item.id ? 'active' : ''}
                    >{item.title}</li>
                })}
            </ul>
        </div>

    );
}
)

export default Categories;
