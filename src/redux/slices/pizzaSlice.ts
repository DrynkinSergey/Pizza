import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {Sort} from "./filterSlice";

type Pizza = {
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
    id: string,
    rating: number
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status;

}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
export type SearchPizzasParams = {
    currentPage:string,
    sortBy:string,
    order:string,
    category:string,
    search:string
}

const baseUrl = 'https://628aaea77886bbbb37aaa711.mockapi.io/items?';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzasParams>(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const {
            currentPage,
            sortBy,
            order,
            category,
            search
        } = params;
        const {data} = await axios.get<Pizza[]>(`${baseUrl}page=${currentPage}&limit=8&${category}sortBy=${sortBy}&order=${order}${search}`);
        return data
    },
)
const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas: (state, action) => {
            state.items = action.payload;
        }
    },
    extraReducers: ((builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.items = [];
            state.status = Status.LOADING
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR
            state.items = [];
        });
    })

})

export const {setPizzas} = pizzaSlice.actions

export default pizzaSlice.reducer