import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useService } from "../../../hooks/useService";
import { bookServiceFactory } from "../../../services/book";
import { BodyCard } from "../BodyCard/BodyCard";

import style from './UserBook.module.css';
import { useBookContext } from "../../../contexts/BookContext";


export const UserBook = () => {

    const { setType } = useBookContext({});
    const { id } = useParams();

    useEffect(() => {
        setType(id);
    }, [id]);

    return (
        <section className={style["body__card"]}>
            <h1>Catalog with {id} Books</h1>
            <BodyCard />
        </section>
    );
}