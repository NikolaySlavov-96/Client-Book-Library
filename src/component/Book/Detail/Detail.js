import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useService } from "../../../hooks/useService";
import { bookServiceFactory } from "../../../services/book";

import style from './Detail.module.css';
import { useAuthContext } from "../../../contexts/AuthContext";


export const Detail = () => {

    const { id } = useParams();
    const [book, setBook] = useState({});
    const bookService = useService(bookServiceFactory);
    const { email } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        bookService.getProduct(id)
            .then(req => {
                setBook(req[0]);
            })
    }, [id]);

    return (
        <section className={style['detail__card']}>
            <div className={style['backward']}>
                <button className={style['btn']} onClick={() => navigate(-1)}><i className="fas fa-chevron-circle-left"></i></button>
            </div>
            <div className={style['container__img']}>
                <img src={book.image} alt={book.booktile} />
            </div>
            <div className={style['container__book']}>
                <p>Book Id:<span>{book.id}</span></p>
                <p>Book Title:<span>{book.booktitle}</span></p>
                <p>Book Author:<span>{book.author}</span></p>
                <p>Book Genre:<span>{book.genre || 'null'}</span></p>
            </div>

            <div className={style['container__functionality']}>
                {email && (<><p>Adding in For Purchase</p>
                    <p>Adding in Purchase</p>
                    <p>Adding in For Reading</p>
                    <p>Adding in Reading </p></>)
                }
            </div>
        </section>
    );
}