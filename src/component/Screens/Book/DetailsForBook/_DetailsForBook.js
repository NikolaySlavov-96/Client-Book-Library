import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { useAuthContext } from "../../../../contexts/AuthContext";
import { useHeadContext } from "../../../../contexts/HeadContext";
import { useBookContext } from "../../../../contexts/BookContext";

import { CustomSelect } from "../../../UI";

import style from './Detail.module.css';

const createBookOptions = (bookState) => {
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


const _DetailsForBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({});
    const [selectPlaceholder, setSelectPlaceholder] = useState('Please select...');
    const [selectOptions, setSelectOptions] = useState([]);

    const { setTitle } = useHeadContext();
    const { email } = useAuthContext();
    const { getBookById, getStateOnBookById, addingBookInList } = useBookContext();


    const loadBook = useCallback(async (bookId) => {
        const loadedBook = await getBookById(bookId);
        setBook(loadedBook);
        setTitle(loadedBook.bookTitle);
    }, [setBook, setTitle, getBookById]);

    const getBookStatus = useCallback(async (bookId) => {
        const bookResult = await getStateOnBookById(bookId);
        const bookState = bookResult?.bookState;
        setSelectPlaceholder(bookState);
        const bookOptions = createBookOptions(bookState);
        setSelectOptions(bookOptions);
    }, [getStateOnBookById, setSelectPlaceholder]);

    useEffect(() => {
        loadBook(id);
    }, [id, loadBook]);

    useEffect(() => {
        getBookStatus(id);
    }, [id, getBookStatus])


    const changeState = useCallback((e, id) => {
        const state = e.value;
        addingBookInList(id, state);
    }, [addingBookInList]);

    return (
        <section className={style['detail__card']}>
            <div className={style['backward']}>
                <button className={style['btn']} onClick={() => navigate(-1)}><i className="fas fa-chevron-circle-left"></i></button>
            </div>
            <div className={style['container__img']}>
                <img src={book.image} alt={book.bookTile} />
            </div>
            <div className={style['container__book']}>
                <p>Book Id:<span>{book.id}</span></p>
                <p>Book Title:<span>{book.bookTitle}</span></p>
                <p>Book Author:<span>{book?.author?.name}</span></p>
                <p>Book Genre:<span>{book.genre || 'null'}</span></p>
            </div>

            {email && (
                <div className={`${style['functionality__reagin']} ${style['functionality']}`}>
                    <CustomSelect
                        options={selectOptions}
                        placeHolder={selectPlaceholder}
                        onChange={(e) => changeState(e, book.id)}
                    />
                </div>
            )
            }
        </section>
    );
}

export default memo(_DetailsForBook);