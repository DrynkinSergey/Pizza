import React, {useCallback, useState} from 'react';


import styles from './search.module.scss'
import {useDispatch, useSelector} from "react-redux";
import debounce from 'lodash.debounce';
import {setSearchQuery} from "../../redux/slices/filterSlice";
import {useLocation} from "react-router-dom";    //@ts-ignore

const Search:React.FC = () => {
    const dispatch = useDispatch();
    //@ts-ignore
    const searchValue = useSelector(state => state.sort.searchValue);
    const [value, setValue] = useState<string>('');
    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchQuery(str))
        },400), []
    );
    const onChangeInput = (event:any) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value)
    }
    const pathName = useLocation();
    if(pathName.pathname === '/Pizza/') {


        return (
            <div className={styles.root}>
                <svg className={styles.icon}
                     enableBackground="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50"
                     width="50px">
                    <rect fill="none" height="50" width="50"/>
                    <circle cx="21" cy="20" fill="none" r="16" stroke="#000000" strokeLinecap="round"
                            strokeMiterlimit="10" strokeWidth="2"/>
                    <line fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="4" x1="32.229" x2="45.5"
                          y1="32.229" y2="45.5"/>
                </svg>
                {/*
           При вводе текста в input используется хук UseSelector для получения состояния из store
           Value input'a завязано на состоянии и происходит flux груговорт
           Диспатчим изменения input в store
           */}
                <input value={value} onChange={(event) => onChangeInput(event)} className={styles.input}
                       placeholder='Поиск пиццы:'/>

                {/*
            Используется условный рендер и отображение иконки
            */}
                {searchValue && <svg
                    onClick={() => {
                        setValue('')
                        updateSearchValue('')

                    }}
                    className={styles.iconClear} height="48" viewBox="0 0 48 48" width="48">
                    <path
                        d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/>
                    <path d="M0 0h48v48H0z" fill="none"/>
                </svg>}

            </div>
        );
    }
};

export default Search;
