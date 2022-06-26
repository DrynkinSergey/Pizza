import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const { baseUrl,
            currentPage,
            sortBy,
            order,
            category,
            search} = params;
        const {data} = await axios.get(`${baseUrl}page=${currentPage}&limit=8&${category}sortBy=${sortBy}&order=${order}${search}`);
        console.log(data)
        return data
    },
)
const initialState = {
    items: [],
    status: 'loading'
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas: (state, action) => {
        state.items = action.payload;
        }
    },
    extraReducers:  {
        [fetchPizzas.pending] : (state) => {
            state.items = [];
            state.status = 'loading'
        },
       [fetchPizzas.fulfilled] : (state, action) => {
           state.items = action.payload;
           state.status = 'success'
        },
        [fetchPizzas.rejected] : (state) => {
            state.status = 'error'
            state.items = [];

        },
    },
})

export const {setPizzas} = pizzaSlice.actions

export default pizzaSlice.reducer