import {configureStore} from '@reduxjs/toolkit'

import sort from './slices/filterSlice'
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";
import {useDispatch} from "react-redux";


export const store = configureStore({
    reducer: {
        sort,
        cart,
        pizza,
    },
})
export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch