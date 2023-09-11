import { useBookContext } from "../../../contexts/BookContext";

import style from './Pagenation.module.css';

export const Pagenation = ({ books }) => {

    const { setPage, page, limit } = useBookContext({});
    const count = Math.ceil(books / limit) || 0;

    return (
        <div className={style['pagination__container']}>
            <button onClick={() => (page - 1) && setPage(page - 1)}>-</button>
            <p>{page}</p>
            <button onClick={() => (count >= (page + 1)) ? setPage(page + 1) : ''}>+</button>
        </div>
    );
}