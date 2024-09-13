import { memo } from "react";
import { Link } from "react-router-dom";

import { ROUT_NAMES } from "../../../Constants";

import style from './_BookCard.module.css';

const _BookCard = (props) => {
    const {
        authorName,
        bookTitle,
        bookGenre,
        bookId,
        bookImage
    } = props;

    return (
        <article className={style["card__art"]}>
            <div className={style["card__img"]}>
                <img src={bookImage} alt={bookTitle} />
            </div>
            <h1>{bookTitle}</h1>
            <div className={style['card__info']}>
                <p>Title: <span >{bookTitle}</span></p>
                <p>Author: <span >{authorName}</span></p>
                <p>Genre: <span >{bookGenre}</span></p>
            </div>
            <div className={style['card__link']}>
                <Link to={`${ROUT_NAMES.BOOK}/${bookId}`} state={{ bookTitle }}>View</Link>
            </div>
        </article >
    );
}

export default memo(_BookCard);