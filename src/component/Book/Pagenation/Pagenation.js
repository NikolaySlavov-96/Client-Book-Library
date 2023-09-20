import { useBookContext } from "../../../contexts/BookContext";

import style from './Pagenation.module.css';

export const Pagenation = ({ books }) => {

    const { setPage, page, limit } = useBookContext({});
    const count = Math.ceil(books / limit) || 0;

    return (
        <div className={style['pagination__container']}>
            <button className={style["page"]} onClick={() => (page - 1) > 0 && setPage(page - 1)}>&#x3c;</button>
            {
                page - 2 > 0 && (
                    <button className={style["page"]} onClick={() => setPage(page - 2)}>{page - 2}</button>
                )
            }
            {
                page - 1 > 0 && (
                    <button className={style["page"]} onClick={() => setPage(page - 1)}>{page - 1}</button>
                )
            }
            <p className={`${style["page__current"]} ${style["page"]}`} >{page}</p>
            {
                count >= page + 1 && (
                    <button className={style["page"]} onClick={() => setPage(page + 1)}>{page + 1}</button>
                )
            }
            {
                count >= page + 2 && (
                    <button className={style["page"]} onClick={() => setPage(page + 2)}>{page + 2}</button>
                )
            }
            <button className={style["page"]} onClick={() => (count >= (page + 1)) ? setPage(page + 1) : ''}>&#x3e;</button>
        </div>
    );
}