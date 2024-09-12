import { memo, useEffect, } from "react";

import { useParams } from "react-router-dom";

import { useBookContext } from "../../../../contexts/BookContext";

import { Pagination, QueryBar, ListRenderBook } from "../../../UI";

import style from './_SearchByEmail.module.css';

const _SearchByEmail = () => {
    const param = useParams();

    const { book, page, limit, setPage, setType, setSearchEmail } = useBookContext({});

    const count = Math.ceil(book.count / limit) || 0;

    useEffect(() => {
        setSearchEmail(param.email);
    }, [setType, setSearchEmail, param.email])

    return (
        <section className={style["body__card"]}>
            <h1>Review user books - ??with email</h1>

            <QueryBar
                hasLeftSelector={false}
            />

            <ListRenderBook data={book?.rows || {}} />

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_SearchByEmail);