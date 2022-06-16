import {configureStore} from '@reduxjs/toolkit'

import sort from './slices/filterSlice'
import cart from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        sort,
        cart,
    },
})
