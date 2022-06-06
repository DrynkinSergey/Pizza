import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    index: 0,
    currentPage: 1
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            state.index = action.payload
        },
        onPageChange: (state, action) => {
            state.currentPage = action.payload
        },
        setFilters(state, action){
            state.currentPage = action.payload.currentPage;
            state.sort = Number(action.payload.sort);
            state.categoryId = Number(action.payload.categoryId);
        }
    },
})

export const { changeCategory,onPageChange,setFilters } = categorySlice.actions

export default categorySlice.reducer