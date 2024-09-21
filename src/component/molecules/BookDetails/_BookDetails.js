import { memo } from "react";

import style from './_BookDetails.module.css';

const _BookDetails = (props) => {
    const {
        title,
        image,
        authorName,
        bookGenre
    } = props;

    return (
        <>
            <div className={style['image__container']}>
                <img src={image} alt={title} />
            </div>

            {!!title ? <h1 className={style['book_title']}>{title}</h1> : ''}

            <div className={style['book__container']}>
                <p>Title: <span >{title}</span></p>
                <p>Author: <span >{authorName}</span></p>
                <p>Genre: <span >{bookGenre}</span></p>
            </div>
        </>
    );
};

export default memo(_BookDetails);