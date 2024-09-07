import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import style from './Detail.module.css';

import { useService } from "../../../hooks/useService";
import { bookServiceFactory } from "../../../services/book";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useHeadContext } from "../../../contexts/HeadContext";
import { useBookContext } from "../../../contexts/BookContext";

import { CustomSelect } from "../../UI";


export const Detail = () => {

    const { id } = useParams();
    const [book, setBook] = useState({});
    const bookService = useService(bookServiceFactory);
    const { email } = useAuthContext();
    const { addingBookInList } = useService(useBookContext);
    const [bookState, setBookState] = useState('');
    const navigate = useNavigate();

    const [options, setOptions] = useState([])

    const { setTitle } = useHeadContext();


    useEffect(() => {
        bookService.getProduct(id)
            .then(req => {
                setTitle(req.booktitle);
                setBook(req);
                setBookState(req.bookState);
                const bookInList = books(bookState);
                setOptions(bookInList);
            })
    }, [id]);

    const changeState = (e, id) => {
        const state = e.value
        console.log(e, id, state)
        addingBookInList(id, state);
        setBookState(state)
    }


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
                <div className={`${style['functionality__reagin']} ${style['functionality']}`}>
                    <CustomSelect
                        options={options}
                        placeHolder='Please select...'
                        onChange={(e) => changeState(e, book.id)}
                    />
                </div>
            )
            }
        </section>
    );
}

const books = (bookState) => {

    const valueOfLabels = [
        {
            label: "Adding in For Purchase",
            value: "forpurchase",
        },
        {
            label: "Adding in Purchase",
            value: "purchase",
        },
        {
            label: "Adding in For Reading",
            value: "forreading",
        },
        {
            label: "Adding in Reading",
            value: "reading",
        },
        {
            label: "Adding in Listening",
            value: "listened",
        },
    ]

    return valueOfLabels.filter((b) => b.value !== bookState)
}