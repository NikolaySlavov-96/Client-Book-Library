import { memo } from "react";
import { ViewElement } from '../../atoms';

import style from './_BookDetailSkeleton.module.css';

const DEFAULT_HEIGHT = 20;

const _BookDetailSkeleton = (props) => {
    const {
        hasTitle = true,
    } = props;

    return (
        <div className={style['container']}>

            <div className={style['image__container']}>
                <ViewElement width={300} height={150} />
            </div>

            <div className={style['inner__container']}>
                {hasTitle ? <ViewElement width={180} height={DEFAULT_HEIGHT} /> : null}
            </div>

            <div className={style['inner__container']}>
                <ViewElement width={220} height={DEFAULT_HEIGHT} />
            </div>

            <div className={style['inner__container']}>
                <ViewElement width={180} height={DEFAULT_HEIGHT} />
            </div>

        </div >
    );
};

export default memo(_BookDetailSkeleton);