import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: [],
    size:0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

       /* addItem: (state, action) => {
            state.items.push(action.payload)
            const newItems = [...state.items, action.payload]
            state.totalPrice = state.items.reduce((sum,obj) => {
                return obj.price + sum
            }, 0)

        },*/
        addItem: (state, action) => {
           const findItem = state.items.find(obj => obj.id === action.payload.id);
           findItem? findItem.count++ : state.items.push({...action.payload, count: 1})
            state.totalPrice = state.items.reduce((sum,obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
            state.size++
        },
        removeItem: (state, action) => {
           state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearCart: (state) => {
           state.items=[]
        },

    },
})

export const {addItem,removeItem,
    clearCart} = cartSlice.actions

export default cartSlice.reducer