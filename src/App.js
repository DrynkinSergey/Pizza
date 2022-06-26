import './scss/app.scss';
import {Route, Routes} from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";


function App() {

    return (
        <div className="App">
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path='/Pizza/' element={<Home/>}/>
                        <Route path='/Pizza/cart' element={<Cart/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </div>
            </div>

        </div>
    );
}

export default App;
