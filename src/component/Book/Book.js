import { useBookContext } from "../../contexts/BookContext";
import { BodyCard } from "./BodyCard/BodyCard";

import style from './Book.module.css';


export const Book = () => {

    const { book } = useBookContext({});

    return (
        <section className={style["body__card"]}>
            <h1>Catalog with Books</h1>
            <BodyCard book={book} />
        </section >
    );
}