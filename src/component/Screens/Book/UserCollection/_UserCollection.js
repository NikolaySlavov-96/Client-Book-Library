import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Pagination } from "../../../molecules";
import { QueryBar, ListRenderBook } from "../../../organisms";

import { useBookContext } from "../../../../contexts/BookContext";

import { QUERY_LIMIT, SEARCH_NAME } from "../../../../Constants";
import { DEFAULT_LOADED_COLLECTION } from "../../../../Constants/_collection";

import { SelectMapper } from "../../../../Helpers";

import style from './_UserCollection.module.css';


const _UserCollection = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    const [collection, setCollection] = useState(1);
    const [searchContent, setSearchContent] = useState('');

    const { book, limit, setLimit, states, loadingBookCollection } = useBookContext({});

    const mappedStates = useMemo(() => {
        const data = SelectMapper(states, { value: 'id', label: 'stateName' });
        return data;
    }, [states]);

    const count = Math.ceil(book.count / limit) || 0;
    
    const onSearchFunction = useCallback((data) => {
        // Always set on initial search
        setPage(1);
        setSearchContent(data.search)
    }, [setSearchContent, setPage]);

    useEffect(() => {
        const searchPage = Number(searchParams.get(SEARCH_NAME.PAGE));
        const searchLimit = Number(searchParams.get(SEARCH_NAME.LIMIT));
        const collectionNumber = Number(searchParams.get(SEARCH_NAME.COLLECTION));
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
        if (!collectionNumber) {
            setCollection(QUERY_LIMIT.COLLECTION)
        } else {
            setCollection(collectionNumber)
        }

        if (content) {
            setSearchContent(content);
        }

        if (!searchPage || !searchLimit || !collectionNumber) {
            setSearchParams({ page: QUERY_LIMIT.PAGE, limit: QUERY_LIMIT.LIMIT, collectionNumber: QUERY_LIMIT.COLLECTION });
        }
    }, []);

    useEffect(() => {
        if (page || limit || collection || searchContent) {
            setSearchParams({ page: page, limit: limit, collection: collection, content: searchContent });
        }
        loadingBookCollection({ page: page, limit: limit, type: collection, searchContent });
    }, [loadingBookCollection, setSearchParams, limit, page, collection, searchContent]);

    return (
        <section className={style["body__card"]}>
            <h1>Collection of Books</h1>

            <QueryBar
                hasLeftSelector={!!mappedStates.length}
                leftSelectorData={mappedStates}
                leftSelectData={collection || DEFAULT_LOADED_COLLECTION}
                onPressLeftSelector={setCollection}
                onPressSearch={onSearchFunction}
            />

            <ListRenderBook data={book?.rows || {}} />

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_UserCollection);