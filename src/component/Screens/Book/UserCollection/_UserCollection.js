import { memo, useEffect, useMemo, useState } from "react";
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

    const { book, limit, setLimit, states, loadingBookCollection } = useBookContext({});

    const mappedStates = useMemo(() => {
        const data = SelectMapper(states, { value: 'id', label: 'stateName' });
        return data;
    }, [states]);

    const count = Math.ceil(book.count / limit) || 0;

    useEffect(() => {
        const searchPage = Number(searchParams.get(SEARCH_NAME.PAGE));
        const searchLimit = Number(searchParams.get(SEARCH_NAME.LIMIT));
        const collectionNumber = Number(searchParams.get(SEARCH_NAME.COLLECTION));

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

        if (!searchPage || !searchLimit || !collectionNumber) {
            setSearchParams({ page: QUERY_LIMIT.PAGE, limit: QUERY_LIMIT.LIMIT, collectionNumber: QUERY_LIMIT.COLLECTION });
        }
    }, []);

    useEffect(() => {
        if (page || limit || collection) {
            setSearchParams({ page: page, limit: limit, collection: collection });
        }
        loadingBookCollection({ page: page, limit: limit, type: collection });
    }, [loadingBookCollection, setSearchParams, limit, page, collection]);

    return (
        <section className={style["body__card"]}>
            <h1>Collection of Books</h1>

            <QueryBar
                hasLeftSelector={!!mappedStates.length}
                leftSelectorData={mappedStates}
                leftSelectData={collection || DEFAULT_LOADED_COLLECTION}
                onPressLeftSelector={setCollection}
            />

            <ListRenderBook data={book?.rows || {}} />

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_UserCollection);