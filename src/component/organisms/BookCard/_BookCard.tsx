import { FC, memo } from "react";

import { Link } from "../../atoms";
import { BookDetails } from "../../molecules";

import { ROUT_NAMES } from "../../../Constants";

import { TProductCard } from "../../../Types/Product";

import style from './_BookCard.module.css';

const BUTTON_LABEL = 'View';

const _BookCard: FC<TProductCard> = (props) => {
    const {
        productTitle,
        productId,
    } = props;

    return (
        <article className={`shadow ${style["container"]}`}>

            <BookDetails {...props} hasTitle />

            <div className={style['card__link']}>
                <Link
                    to={`${ROUT_NAMES.PRODUCT}/${productId}`}
                    state={{ productTitle }}
                >
                    {BUTTON_LABEL}
                </Link>
            </div>
        </article >
    );
}

export default memo(_BookCard);