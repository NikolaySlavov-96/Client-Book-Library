import { memo } from 'react';

import style from './Pagination.module.css';


const _Pagination = ({ count, page, onSubmit }) => {

    return (
        <div className={style['pagination__container']}>
            <button className={style["page"]} onClick={() => (page - 1) > 0 && onSubmit(page - 1)}>&#x3c;</button>
            {
                page - 2 > 0 && (
                    <button className={style["page"]} onClick={() => onSubmit(page - 2)}>{page - 2}</button>
                )
            }
            {
                page - 1 > 0 && (
                    <button className={style["page"]} onClick={() => onSubmit(page - 1)}>{page - 1}</button>
                )
            }
            <p className={`${style["page__current"]} ${style["page"]}`} >{page}</p>
            {
                count >= page + 1 && (
                    <button className={style["page"]} onClick={() => onSubmit(page + 1)}>{page + 1}</button>
                )
            }
            {
                count >= page + 2 && (
                    <button className={style["page"]} onClick={() => onSubmit(page + 2)}>{page + 2}</button>
                )
            }
            <button className={style["page"]} onClick={() => (count >= (page + 1)) ? onSubmit(page + 1) : ''}>&#x3e;</button>
        </div>
    );
}

export default memo(_Pagination);