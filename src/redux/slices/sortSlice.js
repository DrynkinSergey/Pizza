import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    sortProperty: 'rating',
    sortName: 'популярности'
}

export const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        changeSortProp: (state, action) => {
            state.sortProperty = action.payload
        },
        changeSortName: (state, action) => {
            state.sortName = action.payload
        },
    },
})

export const {changeSortProp, changeSortName} = sortSlice.actions

export default sortSlice.reducer