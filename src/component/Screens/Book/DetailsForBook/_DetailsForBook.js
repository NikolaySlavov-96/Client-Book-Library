import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { Select } from "../../../molecules";

import { useAuthContext } from "../../../../contexts/AuthContext";
import { useBookContext } from "../../../../contexts/BookContext";

import { FormatSelectOptions } from "../../../../Helpers";

import style from './_Detail.module.css';


const createBookOptions = (bookState, mappedStates) => {
    return mappedStates.filter((b) => b.value !== bookState)
}

const DEFAULT_MESSAGE = 'Please select...';

const _DetailsForBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({});
    const [selectPlaceholder, setSelectPlaceholder] = useState(DEFAULT_MESSAGE);
    const [selectOptions, setSelectOptions] = useState([]);

    const { email } = useAuthContext();
    const { getBookById, getStateOnBookById, addingBookInList, states } = useBookContext();

    const mappedStates = useMemo(() => {
        const data = FormatSelectOptions(states, { value: 'id', label: 'stateName' });
        return data;
    }, [states]);

    const loadBook = useCallback(async (bookId) => {
        const loadedBook = await getBookById(bookId);
        setBook(loadedBook);
    }, [setBook, getBookById]);

    const getBookStatus = useCallback(async (bookId) => {
        const bookResult = await getStateOnBookById(bookId);
        const bookState = bookResult?.stateId;
        setSelectPlaceholder(bookState);
        const bookOptions = createBookOptions(bookState, mappedStates);
        setSelectOptions(bookOptions);
    }, [getStateOnBookById, setSelectPlaceholder, mappedStates]);

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

    const selectedLabel = useMemo(() => (
        typeof selectPlaceholder === 'number' ? mappedStates[selectPlaceholder].label : DEFAULT_MESSAGE
    ), [mappedStates, selectPlaceholder]);

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
                    <Select
                        options={selectOptions}
                        placeHolder={selectedLabel}
                        onChange={(e) => changeState(e, book.id)}
                    />
                </div>
            )
            }
        </section>
    );
}

export default memo(_DetailsForBook);