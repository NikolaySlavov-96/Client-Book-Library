import { FC, memo } from "react";

import { ViewElement } from '../../atoms';

import { IProductSkeleton } from "../Types/Product";

import style from './_BookDetailSkeleton.module.css';

const DEFAULT_HEIGHT = 20;

const _BookDetailSkeleton: FC<IProductSkeleton> = (props) => {
    const {
        hasTitle = true,
    } = props;

    return (
        <div className={style['container']}>
            <ViewElement width={300} height={150} />

            {hasTitle ? <ViewElement width={180} height={DEFAULT_HEIGHT} /> : null}

            <ViewElement width={220} height={DEFAULT_HEIGHT} />

            <ViewElement width={180} height={DEFAULT_HEIGHT} />
        </div >
    );
};

export default memo(_BookDetailSkeleton);