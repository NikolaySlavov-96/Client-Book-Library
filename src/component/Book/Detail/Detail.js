import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import style from './Detail.module.css';

import { useService } from "../../../hooks/useService";
import { bookServiceFactory } from "../../../services/book";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useHeadContext } from "../../../contexts/HeadContext";
import { useBookContext } from "../../../contexts/BookContext";


export const Detail = () => {

    const { id } = useParams();
    const [book, setBook] = useState({});
    const bookService = useService(bookServiceFactory);
    const { email } = useAuthContext();
    const { addingBookInList } = useService(useBookContext)
    const navigate = useNavigate();

    const { setTitle } = useHeadContext();

    useEffect(() => {
        bookService.getProduct(id)
            .then(req => {
                setTitle(req.booktitle);
                setBook(req);
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
                <p>Book Author:<span>{book?.author?.name}</span></p>
                <p>Book Genre:<span>{book.genre || 'null'}</span></p>
            </div>

            {email && (
                <>
                    <div className={`${style['functionality__purchase']} ${style['functionality']}`}>
                        <button onClick={() => addingBookInList(book.id, 'forpurchase')}>Adding in For Purchase</button>
                        <button onClick={() => addingBookInList(book.id, 'purchase')}>Adding in Purchase</button>
                    </div>
                    <div className={`${style['functionality__reagin']} ${style['functionality']}`}>
                        <button onClick={() => addingBookInList(book.id, 'forreading')}>Adding in For Reading</button>
                        <button onClick={() => addingBookInList(book.id, 'reading')}>Adding in Reading</button>
                    </div>
                </>
            )
            }
        </section>
    );
}