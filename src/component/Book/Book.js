import { useBookContext } from "../../contexts/BookContext";
import { BookCard } from "./Cards/BookCard";

import style from './Book.module.css';
import { Pagenation } from "./Pagenation/Pagenation";

export const Book = () => {

    const { book } = useBookContext({});

    return (
        <section className={style["body__card"]}>
            <h1>Catalog with products</h1>
            <div className={style["body__list"]}>
                {book?.rows && book?.rows?.map(e => <BookCard key={e.id} {...e} />)}
                {!book?.rows?.length && (<h2>There are no items added yet.</h2>)}
            </div>
                <Pagenation books={book?.count} />
        </section >
    );
}