import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type CartItem = {
    title:string,
    price:number,
    imageUrl:string,
    size:number,
    type:string,
    id:string,
    count: number;
}

interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}

const initialState:CartSliceState = {
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItem: (state, action:PayloadAction<CartItem>) => {
           const findItem = state.items.find(obj => obj.id === action.payload.id);
           findItem? findItem.count++ : state.items.push({...action.payload, count: 1})
            state.totalPrice = state.items.reduce((sum,obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        minusItem: (state, action:PayloadAction<string>) => {

            const findItem = state.items.find(obj => obj.id === action.payload);
            if(findItem){
                findItem.count--;
                state.totalPrice = state.items.reduce((sum,obj) => {
                    return (obj.price * obj.count) + sum
                }, 0)
            }

        },
        removeItem: (state, action:PayloadAction<string>) => {
          if(window.confirm('Вы действительно хотите удалить товар?')){state.items = state.items.filter(obj => obj.id !== action.payload)}
            state.totalPrice = state.items.reduce((sum,obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        clearCart: (state) => {
           state.items = [];
            state.totalPrice = 0;
        },

    },
})

export const {addItem,removeItem,minusItem,
    clearCart} = cartSlice.actions

export default cartSlice.reducer