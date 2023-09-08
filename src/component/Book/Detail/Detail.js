import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useService } from "../../../hooks/useService";
import { bookServiceFactory } from "../../../services/book";

import style from './Detail.module.css';
import { useAuthContext } from "../../../contexts/AuthContext";

export const Detail = () => {

    const { id } = useParams();
    const [book, setBook] = useState({});
    const bookService = useService(bookServiceFactory);
    const { username } = useAuthContext();

    useEffect(() => {
        bookService.getProduct(id)
            .then(req => {
                setBook(req[0]);
            })
    }, [id]);

    return (
        <section className={style['detail__card']}>
            <p>{book.id}</p>
            <p>{book.author}</p>
            <p>{book.booktitle}</p>
            <img src={book.image} alt={book.booktile} />
            <p>{book.genre}</p>

            {!username && (<><p>Adding in For Purchase</p> <p>Adding in Purchase</p></>)
            }
        </section>
    );
}