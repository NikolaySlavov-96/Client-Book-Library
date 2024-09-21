import { memo } from "react";

import style from './_BookDetails.module.css';

const _BookDetails = (props) => {
    const {
        authorName,
        bookGenre,
        hasTitle,
        image,
        title,
    } = props;

    return (
        <>
            <div className={style['image__container']}>
                <img src={image} alt={title} />
            </div>

            {hasTitle ? <h1 className={style['book_title']}>{title}</h1> : ''}

            <div className={style['book__container']}>
                <p>Title: <span >{title}</span></p>
                <p>Author: <span >{authorName}</span></p>
                <p>Genre: <span >{bookGenre}</span></p>
            </div>
        </>
    );
};

export default memo(_BookDetails);