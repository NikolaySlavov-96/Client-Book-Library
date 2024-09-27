import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { IconActionButton } from "../../../atoms";
import { BookDetails, Select } from "../../../molecules";

import { useAuthContext } from "../../../../contexts/AuthContext";
import { useBookContext } from "../../../../contexts/BookContext";

import { FormatSelectOptions } from "../../../../Helpers";

import style from './_DetailsForBook.module.css';

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

    const changeState = useCallback((e, id) => {
        const state = e.value;
        addingBookInList(id, state);
    }, [addingBookInList]);

    const onPressBackButton = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const selectedLabel = useMemo(() => (
        typeof selectPlaceholder === 'number' ? mappedStates[selectPlaceholder].label : DEFAULT_MESSAGE
    ), [mappedStates, selectPlaceholder]);

    useEffect(() => {
        loadBook(id);
    }, [id, loadBook]);

    useEffect(() => {
        if (email) {
            getBookStatus(id);
        }
    }, [id, getBookStatus, email])

    return (
        <section className={style['detail__card']}>

            <IconActionButton onClick={onPressBackButton} />

            <div className={style['book-card__detail']}>
                <BookDetails
                    image={book?.image}
                    genre={book?.genre}
                    title={book?.bookTitle}
                    authorName={book?.Author?.name}
                />
            </div>

            {email ? (
                <div className={`${style['functionality']}`}>
                    <Select
                        options={selectOptions}
                        placeHolder={selectedLabel}
                        onChange={(e) => changeState(e, book.id)}
                    />
                </div>)
                : null
            }
        </section>
    );
}

export default memo(_DetailsForBook);