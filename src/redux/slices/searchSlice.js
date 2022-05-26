import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    searchString: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        onTyping: (state, action) => {
            state.searchString = action.payload
        },
    },
})

export const {onTyping} = searchSlice.actions

export default searchSlice.reducer