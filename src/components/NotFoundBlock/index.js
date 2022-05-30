import React from 'react';
import styles from './notFoundBlock.module.scss'
const NotFoundBlock = ({title}) => {
    return (

        <h1 className={styles.content}>
            <icon>😕</icon>
            <br/>
            {title}</h1>

    );
};

export default NotFoundBlock;
