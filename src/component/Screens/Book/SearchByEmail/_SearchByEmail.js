import { memo, useEffect, useState, } from "react";

import { useParams } from "react-router-dom";

import { Pagination } from "../../../molecules";
import { QueryBar, ListRenderBook } from "../../../organisms";

import { useBookContext } from "../../../../contexts/BookContext";

import style from './_SearchByEmail.module.css';

const _SearchByEmail = () => {
    const param = useParams();

    const [page, setPage] = useState(1);

    const { book, limit, setSearchEmail } = useBookContext({});

    const count = Math.ceil(book.count / limit) || 0;

    useEffect(() => {
        setSearchEmail(param.email);
    }, [setSearchEmail, param.email])

    return (
        <section className={style["body__card"]}>
            <h1>Review user books - ??with email</h1>

            <QueryBar
                hasLeftSelector={false}
                onPressSearch={(data) => console.log('SearchByEmail', data)}
            />

            <ListRenderBook data={book?.rows || {}} />

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_SearchByEmail);