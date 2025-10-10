import { FC, memo } from "react";

import { Link } from "../../atoms";
import { ProductDetails } from "../../molecules";

import { ROUT_NAMES } from "../../../constants";

import { TProductCard } from "../../../Types/Product";

import style from './_ProductCard.module.css';
import { TViewType } from "~/Types/Components";


type TProductCardProps = TProductCard & {
    viewType: TViewType;
}

const _ProductCard: FC<TProductCardProps> = (props) => {
    const {
        productTitle,
        productId,
        viewType,
    } = props;

    return (
        <Link
            to={`${ROUT_NAMES.PRODUCT}/${productId}`}
            state={{ productTitle }}
        >
            <article className={`shadow ${style.container} ${style[`${viewType}__container`]}`}>
                <ProductDetails {...props} hasTitle />
            </article >
        </Link>
    );
}

export default memo(_ProductCard);