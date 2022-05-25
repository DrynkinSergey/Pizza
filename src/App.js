import './scss/app.scss';
import {Route, Routes} from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import {useState} from "react";

    export const Context = React.createContext()

function App() {

    const [searchValue, setSearchValue] = useState('');
    return (
        <div className="App">
        <Context.Provider value={{
            searchValue,setSearchValue
        }}>
            <div className="wrapper">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/cart' element={<Cart/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>

                </div>
            </div>

        </Context.Provider>
        </div>
    );
}

export default App;
