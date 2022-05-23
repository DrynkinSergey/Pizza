import React from 'react';
import styles from './notFoundBlock.module.scss'
const NotFoundBlock = () => {
    return (

        <h1 className={styles.content}>
            <icon>😕</icon>
            <br/>
            Страница не найдена</h1>

    );
};

export default NotFoundBlock;
