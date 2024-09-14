import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useBookContext } from "../../../../contexts/BookContext";

import { Pagination } from "../../../molecules";
import { QueryBar, ListRenderBook } from "../../../organisms";

import { QUERY_LIMIT, SEARCH_NAME } from "../../../../Constants";

import style from './_Book.module.css';

const _Books = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(1);

    const { book, limit, setLimit, loadingBooks } = useBookContext({});

    const count = Math.ceil(book.count / limit) || 0;

    useEffect(() => {
        const searchPage = Number(searchParams.get(SEARCH_NAME.PAGE));
        const searchLimit = Number(searchParams.get(SEARCH_NAME.LIMIT));

        if (!searchPage) {
            setPage(QUERY_LIMIT.PAGE);
        } else {
            setPage(searchPage);
        }
        if (!searchLimit) {
            setLimit(QUERY_LIMIT.LIMIT);
        } else {
            setLimit(searchLimit);
        }

        if (!searchPage || !searchLimit) {
            setSearchParams({ page: QUERY_LIMIT.PAGE, limit: QUERY_LIMIT.LIMIT });
        }
    }, []);

    useEffect(() => {
        if(page || limit)
        setSearchParams({ page: page, limit: limit });
        loadingBooks({ page: page, limit: limit });
    }, [loadingBooks, setSearchParams, limit, page]);

    return (
        <section className={style["body__card"]}>
            <h1>Catalog with Books</h1>

            <QueryBar
                hasLeftSelector={false}
            />

            <ListRenderBook data={book?.rows || {}} />

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_Books);