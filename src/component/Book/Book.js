import { BodyCard } from "./BodyCard/BodyCard";

import style from './Book.module.css';


export const Book = () => {

    return (
        <section className={style["body__card"]}>
            <h1>Catalog with Books</h1>
            <BodyCard />
        </section >
    );
}