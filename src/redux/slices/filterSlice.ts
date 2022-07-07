import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export enum SortPropertyEnum {
    RATING_DESC='rating',
    RATING_ASC='-rating',
    TITLE_DESC='title',
    TITLE_ASC='-title',
    PRICE_DESC='price',
    PRICE_ASC='-price',
}
export type Sort = {
    name:string;
    sortProperty:SortPropertyEnum}

export interface FilterSliceState {
    searchValue:string,
    categoryId:number,
    currentPage:number,
    sort: Sort
}

const initialState:FilterSliceState = {
    sort:{
        name:'популярности',
        sortProperty:SortPropertyEnum.PRICE_DESC
    },
    searchValue:'',
    categoryId: 0,
    currentPage:1,
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSort: (state, action:PayloadAction<Sort>) => {
            state.sort = action.payload
        },
        setCategoryId: (state, action:PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setCurrentPage: (state, action:PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilters(state, action:PayloadAction<FilterSliceState>){
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        },
        setSearchQuery: (state, action:PayloadAction<string>) => {
            state.searchValue = action.payload
        },
    },
})

export const {setSort, setCategoryId,setCurrentPage,setSearchQuery, setFilters} = filterSlice.actions

export default filterSlice.reducer