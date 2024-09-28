import { memo } from "react";

import { ViewElement } from '../../atoms';

import style from './_BookCardSkeleton.module.css';

const DEFAULT_HEIGHT = 20;

const _BookCardSkeleton = (props) => {
    const {
        hasTitle = true,
    } = props;

    return (
        <div className={style['container']}>

            <div className={style['image__container']}>
                <ViewElement width={200} height={100} />
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

            <div className={style['inner__container']}>
                <ViewElement width={160} height={DEFAULT_HEIGHT} />
            </div>


            <div className={style['inner__container']}>
                <ViewElement width={80} height={30} />
            </div>
        </div >
    );
};

export default memo(_BookCardSkeleton);