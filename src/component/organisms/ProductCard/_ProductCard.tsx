import { FC, memo } from "react";

import { Link } from "../../atoms";
import { ProductDetails } from "../../molecules";

import { ROUT_NAMES } from "../../../constants";

import { TProductCard } from "../../../Types/Product";

import style from './_ProductCard.module.css';

const BUTTON_LABEL = 'View';

const _ProductCard: FC<TProductCard> = (props) => {
    const {
        productTitle,
        productId,
    } = props;

    return (
        <article className={`shadow ${style["container"]}`}>

            <ProductDetails {...props} hasTitle />

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

export default memo(_ProductCard);