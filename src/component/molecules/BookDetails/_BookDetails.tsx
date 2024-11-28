import { FC, memo } from "react";

import { TProductCard } from "../../../Types/Product";

import style from './_BookDetails.module.css';

type TBookDetails = TProductCard & {
    hasTitle?: boolean;
}

const _BookDetails: FC<TBookDetails> = (props) => {
    const {
        authorName,
        productType,
        fileUrl,
        fileSrc,
        hasTitle,
        productTitle,
    } = props;

    return (
        <>
            <div className={style['image__container']}>
                <img src={fileUrl} alt={fileSrc} />
            </div>

            {hasTitle ? <h1 className={style['book_title']}>{productTitle}</h1> : ''}

            <div className={style['book__container']}>
                {!hasTitle ? <p>Title: <span >{productTitle}</span></p> : null}
                <p>Author: <span >{authorName}</span></p>
                <p>Genre: <span >{productType}</span></p>
            </div>
        </>
    );
};

export default memo(_BookDetails);