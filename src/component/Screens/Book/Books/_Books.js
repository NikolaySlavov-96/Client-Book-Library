import { memo, useCallback, useMemo } from "react";

import { useLocation } from "react-router-dom";

import { useBookContext } from "../../../../contexts/BookContext";

import { CustomSelect, Pagination, SearchField, BookCard } from "../../../UI";

import ROUT_NAMES from "../../../../Constants/routNames";
import { useForm } from "../../../../hooks/useForm";

import style from './Book.module.css';

const collectionOptions = [
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
];

const pageSizeOptions = [
    {
        label: '12',
        value: '12',
    },
    {
        label: '24',
        value: '24',
    },
    {
        label: '36',
        value: '36',
    },
    {
        label: '72',
        value: '72',
    },
]

const _Books = () => {

    const location = useLocation();

    const { setType, book, page, limit, setLimit, onSubmitSearchWithInput, setPage } = useBookContext({});

    const count = Math.ceil(book.count / limit) || 0;

    const { values, changeHandler, onSubmit } = useForm({
        search: '',
    }, onSubmitSearchWithInput, {
        search: ['required', '2']
    }, false);

    const changeState = useCallback((e) => {
        const state = e.value
        setType(state)
    }, [setType]);

    const pageLimit = useCallback((e) => {
        const pageSize = e.value;
        setLimit(pageSize);
    }, [setLimit]);

    const renderName = useMemo(() => {
        const pathName = location.pathname;

        if (pathName === ROUT_NAMES.USER_COLLECTION) {
            return 'Collection of Books'
        }

        return 'Catalog with Books'
    }, [location.pathname]);

    return (
        <section className={style["body__card"]}>
            <h1>{renderName}</h1>

            <div className={`global__bg-radius ${style['partial__container']}`}>
                {location.pathname === ROUT_NAMES.USER_COLLECTION ? <CustomSelect
                    options={collectionOptions}
                    placeHolder='Please select...'
                    onChange={changeState}
                    size={'240'}
                /> : <div></div>}

                <SearchField
                    values={values}
                    changeHandler={changeHandler}
                    onSubmit={onSubmit}
                />

                <CustomSelect
                    options={pageSizeOptions}
                    placeHolder={'12'}
                    onChange={pageLimit}
                    size={'70'}
                />
            </div>

            <div className={style["body__list"]}>
                {book?.rows && book?.rows?.map(e => <BookCard key={e.id} {...e} />)}
                {!book?.rows?.length && (<h2>There are no items added yet.</h2>)}
            </div>

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_Books);