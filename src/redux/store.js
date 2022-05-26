import {configureStore} from '@reduxjs/toolkit'

import categoryReducer from './slices/filterSlice'
import sortReducer from './slices/sortSlice'
import searchReducer from './slices/searchSlice'

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        sort: sortReducer,
        search: searchReducer,
    },
})
