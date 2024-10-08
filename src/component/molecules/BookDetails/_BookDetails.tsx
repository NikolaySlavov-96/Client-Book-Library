import { FC, memo } from "react";

import { IBookProps } from "../../../Types/Book";

import style from './_BookDetails.module.css';

const _BookDetails: FC<IBookProps> = (props) => {
    const {
        authorName,
        bookGenre,
        imageUrl,
        bookSrc,
        hasTitle,
        bookTitle,
    } = props;

    return (
        <>
            <div className={style['image__container']}>
                <img src={imageUrl} alt={bookSrc} />
            </div>

            {hasTitle ? <h1 className={style['book_title']}>{bookTitle}</h1> : ''}

            <div className={style['book__container']}>
                {!hasTitle ? <p>Title: <span >{bookTitle}</span></p> : null}
                <p>Author: <span >{authorName}</span></p>
                <p>Genre: <span >{bookGenre}</span></p>
            </div>
        </>
    );
};

export default memo(_BookDetails);