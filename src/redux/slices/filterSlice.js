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
    },
})

export const { changeCategory,onPageChange } = categorySlice.actions

export default categorySlice.reducer