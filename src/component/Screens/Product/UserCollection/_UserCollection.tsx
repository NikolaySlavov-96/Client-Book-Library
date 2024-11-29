import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useStoreZ } from "../../../../hooks";

import { SectionTitle } from "../../../atoms";
import { Pagination } from "../../../molecules";
import { QueryBar, ListRenderProduct } from "../../../organisms";

import { ListRenderProductSkeletons } from "../../../../Skeleton/organisms";

import { QUERY_LIMIT, SEARCH_NAME } from "../../../../Constants";

import { IQueryBar } from "../../../../Types/QueryBar";

import { FormatSelectOptions } from "../../../../Helpers";

const DEFAULT_LOADED_COLLECTION = 1;
const SECTION_TITLE = 'Collection of Books';

const _UserCollection = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    const [collection, setCollection] = useState(1);
    const [searchContent, setSearchContent] = useState('');

    const { productStates, isLoadingProductCollection, productCollection, fetchProductCollection, pageLimit, setPageLimit } = useStoreZ();

    const mappedStates = useMemo(() => {
        const data = FormatSelectOptions(productStates, { value: 'id', label: 'stateName' });
        return data;
    }, [productStates]);

    const count = Math.ceil(productCollection.count / pageLimit) || 0;

    const onSearchFunction = useCallback((data: IQueryBar) => {
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
            setPageLimit(QUERY_LIMIT.LIMIT);
        } else {
            setPageLimit(searchLimit);
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
            setSearchParams({ page: QUERY_LIMIT.PAGE.toString(), limit: QUERY_LIMIT.LIMIT.toString(), collectionNumber: QUERY_LIMIT.COLLECTION.toString() });
        }
    }, []);

    useEffect(() => {
        if (page || pageLimit || collection || searchContent) {
            setSearchParams({ page: page.toString(), limit: pageLimit.toString(), collection: collection.toString(), content: searchContent });
        }
        fetchProductCollection({ page: page, limit: pageLimit, type: collection, searchContent });
    }, [fetchProductCollection, setSearchParams, pageLimit, page, collection, searchContent]);

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

            {isLoadingProductCollection ? <ListRenderProductSkeletons limit={pageLimit} /> : <ListRenderProduct data={productCollection?.rows || {}} />}

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_UserCollection);