import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    sort:{
        name:'популярности',
        sortProperty:'rating'
    },
    searchValue:'',
    categoryId: 0,
    currentPage:1,
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSort: (state, action) => {
            state.sort = action.payload
        },
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setFilters(state, action){
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        }
    },
})

export const {setSort, setCategoryId,setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer