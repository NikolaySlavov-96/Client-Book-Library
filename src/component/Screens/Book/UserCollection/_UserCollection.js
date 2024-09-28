import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useBookContext } from "../../../../contexts/BookContext";

import { SectionTitle } from "../../../atoms";
import { Pagination } from "../../../molecules";
import { QueryBar, ListRenderBook } from "../../../organisms";

import { ListRenderBookSkeletons } from "../../../../Skeleton/organisms";

import { QUERY_LIMIT, SEARCH_NAME } from "../../../../Constants";

import { FormatSelectOptions } from "../../../../Helpers";

const DEFAULT_LOADED_COLLECTION = 1;
const SECTION_TITLE = 'Collection of Books';

const _UserCollection = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    const [collection, setCollection] = useState(1);
    const [searchContent, setSearchContent] = useState('');

    const { book, limit, setLimit, states, loadingBookCollection, isLoading } = useBookContext({});

    const mappedStates = useMemo(() => {
        const data = FormatSelectOptions(states, { value: 'id', label: 'stateName' });
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
        const searchContent = searchParams.get(SEARCH_NAME.CONTENT);

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

        if (searchContent) {
            setSearchContent(searchContent);
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
        <section className={'content__page'}>

            <SectionTitle content={SECTION_TITLE} />

            <QueryBar
                hasLeftSelector={!!mappedStates.length}
                leftSelectorData={mappedStates}
                leftSelectData={collection || DEFAULT_LOADED_COLLECTION}
                onPressLeftSelector={setCollection}
                onPressSearch={onSearchFunction}
            />

            {isLoading ? <ListRenderBookSkeletons limit={limit} /> : <ListRenderBook data={book?.rows || {}} />}

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_UserCollection);