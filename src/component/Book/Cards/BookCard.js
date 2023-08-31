import { Link } from "react-router-dom";

import style from './BookCard.module.css';


export const BookCard = ({ author, booktitle, genre, owner, id, image }) => {
    return (
        <article className={style["card__art"]}>
            <div>
                <img src={image} alt="address" />
            </div>
            {/* <h1>Author: <span >{author}</span></h1> */}
            <div>
                <p>Author: <span >{author}</span></p>
                <p>Title: <span >{booktitle}</span></p>
                <p>Genre: <span >{genre}</span></p>
            </div>
            <div>
                <Link to={`/book/${id}`}>View</Link>
            </div>
        </article >
    );
}