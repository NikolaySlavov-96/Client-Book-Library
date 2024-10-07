import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { IconActionButton } from "../../../atoms";
import { BookDetails, Select } from "../../../molecules";

import { BookDetailSkeleton, SelectSkeleton } from "../../../../Skeleton/molecules";

import { useAuthContext } from "../../../../contexts/AuthContext";
import { useBookContext } from "../../../../contexts/BookContext";

import { FormatSelectOptions } from "../../../../Helpers";

import style from './_DetailsForBook.module.css';

const createBookOptions = (bookState: any, mappedStates: any) => {
    return mappedStates.filter((b: any) => b.value !== bookState)
}

const DEFAULT_MESSAGE = 'Please select...';

const _DetailsForBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState<any>();
    const [selectPlaceholder, setSelectPlaceholder] = useState(DEFAULT_MESSAGE);
    const [selectOptions, setSelectOptions] = useState([]);

    const { email } = useAuthContext();
    const { getBookById, getStateOnBookById, addingBookInList, states, isLoading } = useBookContext();

    const mappedStates = useMemo(() => {
        const data = FormatSelectOptions(states, { value: 'id', label: 'stateName' });
        return data;
    }, [states]);

    const loadBook = useCallback(async (bookId: string) => {
        const loadedBook = await getBookById(bookId);
        setBook(loadedBook);
    }, [setBook, getBookById]);

    const getBookStatus = useCallback(async (bookId: string) => {
        const bookResult = await getStateOnBookById(bookId);
        const bookState = bookResult?.stateId;
        setSelectPlaceholder(bookState);
        const bookOptions = createBookOptions(bookState, mappedStates);
        console.log("🚀 ~ getBookStatus ~ bookOptions:", bookOptions)
        setSelectOptions(bookOptions);
    }, [getStateOnBookById, setSelectPlaceholder, mappedStates]);

    const changeState = useCallback((e: any, id: string) => {
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
        loadBook(id ? id.toString() : '0');
    }, [id, loadBook]);

    useEffect(() => {
        if (!!email) {
            getBookStatus(id ? id.toString() : '0');
        }
    }, [id, getBookStatus, email])

    return (
        <section className={style['detail__card']}>

            <IconActionButton onClick={onPressBackButton} />

            <div className={style['book-card__detail']}>
                {isLoading ?
                    <BookDetailSkeleton /> :
                    <BookDetails {...book} />}
            </div>

            {!!email ?
                isLoading ?
                    <SelectSkeleton />
                    : (
                        <div className={`${style['functionality']}`}>
                            <Select
                                options={selectOptions}
                                placeHolder={selectedLabel}
                                onChange={(e) => changeState(e, book ? book.bookId : '0')}
                                size='70'
                            />
                        </div>)
                : null
            }
        </section>
    );
}

export default memo(_DetailsForBook);