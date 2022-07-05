import React from 'react';
import logo from "../img/pizza-logo.svg";
import {Link} from "react-router-dom";
import Search from "./Search";
import CartBtn from "./CartBtn";

const Header:React.FC = () => {

    return (
        <div className="header">
            <div className="container">
                <Link to='/Pizza/' className="header__logo">
                    <img width="38" src={logo} alt="Pizza logo"/>
                    <div>
                        <h1>PIZZA HUT</h1>
                        <p>Come to Pizza Hut for a real pizza</p>
                    </div>
                </Link>
                <Search/>
                <CartBtn/>
            </div>
        </div>

    );
};

export default Header;
