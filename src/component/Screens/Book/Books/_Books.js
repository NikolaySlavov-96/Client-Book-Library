import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useBookContext } from "../../../../contexts/BookContext";

import { Pagination } from "../../../molecules";
import { QueryBar, ListRenderBook } from "../../../organisms";

import { QUERY_LIMIT, SEARCH_NAME } from "../../../../Constants";

import style from './_Book.module.css';

const _Books = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    const [searchContent, setSearchContent] = useState('');

    const { book, limit, setLimit, loadingBooks } = useBookContext({});

    const count = Math.ceil(book.count / limit) || 0;

    const onSearchFunction = useCallback((data) => {
        // Always set on initial search
        setPage(1);
        setSearchContent(data.search)
    }, [setSearchContent, setPage]);

    useEffect(() => {
        const searchPage = Number(searchParams.get(SEARCH_NAME.PAGE));
        const searchLimit = Number(searchParams.get(SEARCH_NAME.LIMIT));
        const content = searchParams.get(SEARCH_NAME.CONTENT);

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

        if (content) {
            setSearchContent(content);
        }

        if (!searchPage || !searchLimit) {
            setSearchParams({ page: QUERY_LIMIT.PAGE, limit: QUERY_LIMIT.LIMIT });
        }
    }, []);

    useEffect(() => {
        if (page || limit || searchContent)
            setSearchParams({ page: page, limit: limit, content: searchContent });
        loadingBooks({ page: page, limit: limit, searchContent });
    }, [loadingBooks, setSearchParams, limit, page, searchContent]);

    return (
        <section className={style["body__card"]}>
            <h1>Catalog with Books</h1>

            <QueryBar
                hasLeftSelector={false}
                onPressSearch={onSearchFunction}
            />

            <ListRenderBook data={book?.rows || {}} />

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_Books);