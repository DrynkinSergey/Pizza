import React from 'react';
import styles from './notFoundBlock.module.scss'


const NotFoundBlock:React.FC = () => {
    return (

        <h1 className={styles.content}>
            <span>😕</span>
            <br/>
            Страница не найдена!!
        </h1>

    );
};

export default NotFoundBlock;
