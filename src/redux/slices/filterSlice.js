import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    index: 0,
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            state.index = action.payload
        },
    },
})

export const { changeCategory,click } = categorySlice.actions

export default categorySlice.reducer