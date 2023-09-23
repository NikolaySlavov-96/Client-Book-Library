import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useService } from "../../../hooks/useService";
import { bookServiceFactory } from "../../../services/book";
import { BodyCard } from "../BodyCard/BodyCard";

import style from './UserBook.module.css';


export const UserBook = () => {

    const bookService = useService(bookServiceFactory);
    const [userBook, setUserBook] = useState({});

    const { id } = useParams();
    
    useEffect(() => {
        bookService.getUserBooks(id)
            .then(req => {
                setUserBook(req);
            })
    }, [id]);
    
    return (
        <section className={style["body__card"]}>
            <h1>Catalog with {id} Books</h1>
            <BodyCard book={userBook} />
        </section>
    );
}