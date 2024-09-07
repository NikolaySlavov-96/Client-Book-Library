import { memo } from "react";
import { Link } from "react-router-dom";

import ROUT_NAMES from "../../../Constants/routNames";

import style from './BookCard.module.css';

const _BookCard = ({ Author, bookTitle, genre, owner, id, image }) => {
    return (
        <article className={style["card__art"]}>
            <div className={style["card__img"]}>
                <img src={image} alt={bookTitle} />
            </div>
            <h1>{bookTitle}</h1>
            <div className={style['card__info']}>
                <p>Title: <span >{bookTitle}</span></p>
                <p>Author: <span >{Author?.name}</span></p>
                <p>Genre: <span >{genre}</span></p>
            </div>
            <div className={style['card__link']}>
                <Link to={`${ROUT_NAMES.BOOK}/${id}`}>View</Link>
            </div>
        </article >
    );
}

export default memo(_BookCard);