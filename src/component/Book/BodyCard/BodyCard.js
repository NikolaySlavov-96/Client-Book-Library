import { useBookContext } from "../../../contexts/BookContext";
import { BookCard } from "../Cards/BookCard";
import { Filter } from "../Filter/Filter";
import { Pagenation } from "../Pagenation/Pagenation";

import style from './BodyCard.module.css';


export const BodyCard = () => {

    const {book, page, limit} = useBookContext({});
    const count = Math.ceil(book.count / limit) || 0;

    return (
        <>
            <Filter />
            <div className={style["body__list"]}>
                {book?.rows && book?.rows?.map(e => <BookCard key={e.id} {...e} />)}
                {!book?.rows?.length && (<h2>There are no items added yet.</h2>)}
            </div>
            <Pagenation count={count} page={page} />
        </>
    );
}