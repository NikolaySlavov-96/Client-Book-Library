import { BookCard } from "../Cards/BookCard";
import { Filter } from "../Filter/Filter";
import { Pagenation } from "../Pagenation/Pagenation";

import style from './BodyCard.module.css';


export const BodyCard = ({ book }) => {
    return (
        <>
            <Filter />
            <div className={style["body__list"]}>
                {book?.rows && book?.rows?.map(e => <BookCard key={e.id} {...e} />)}
                {!book?.rows?.length && (<h2>There are no items added yet.</h2>)}
            </div>
            <Pagenation books={book?.count} />
        </>
    );
}