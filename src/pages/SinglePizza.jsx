import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const SinglePizza = () => {
    const [pizza, setPizza] = useState()
   const {id} =useParams();
    useEffect(() => {
        const fetchPizza = async () => {
             const {data} = await axios.get("https://628aaea77886bbbb37aaa711.mockapi.io/items/"+id);
             setPizza(data);
        }
        fetchPizza();
    }, []);
    if(!pizza){
        return <h1>Loading</h1>
    }
    return (
        <div className='container'>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }
            }>  <img style={{paddingLeft:'25px',
            width:'60%'}} src={pizza.imageUrl} alt=""/>
                <h1>{pizza.title}</h1>
                <h2>{pizza.price}$</h2>
                <Link  to='/Pizza/'><button style={{margin:'30px 0'}}  className="button "> Вернуться назад</button></Link></div>

        </div>

    );
};

export default SinglePizza;
