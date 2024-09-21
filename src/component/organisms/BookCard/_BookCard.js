import { memo } from "react";

import { Link } from "../../atoms";
import { BookDetails } from "../../molecules";

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
        <article className={style["container"]}>
            
            <BookDetails
                image={bookImage}
                genre={bookGenre}
                title={bookTitle}
                authorName={authorName}
                hasTitle
            />

            <div className={style['card__link']}>
                <Link
                    to={`${ROUT_NAMES.BOOK}/${bookId}`}
                    state={{ bookTitle }}
                >
                    View
                </Link>
            </div>
        </article >
    );
}

export default memo(_BookCard);