import { Link } from "react-router-dom";

import style from './BookCard.module.css';


export const BookCard = ({ author, booktitle, genre, owner, id, image }) => {
    return (
        <article className={style["card__art"]}>
            <div className={style["card__img"]}>
                <img src={image} alt={booktitle} />
            </div>
            <h1>{booktitle}</h1>
            <div className={style['card__info']}>
                <p>Title: <span >{booktitle}</span></p>
                <p>Author: <span >{author}</span></p>
                <p>Genre: <span >{genre}</span></p>
            </div>
            <div className={style['card__link']}>
                <Link to={`/book/${id}`}>View</Link>
            </div>
        </article >
    );
}