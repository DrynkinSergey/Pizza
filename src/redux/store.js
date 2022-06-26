import {configureStore} from '@reduxjs/toolkit'

import sort from './slices/filterSlice'
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";
export const store = configureStore({
    reducer: {
        sort,
        cart,
        pizza,
    },
})
