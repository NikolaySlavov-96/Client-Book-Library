import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useStoreZ } from "../../../../hooks";

import { SectionTitle } from "../../../atoms";
import { Pagination } from "../../../molecules";
import { QueryBar, ListRenderProduct } from "../../../organisms";

import { ListRenderProductSkeletons } from "../../../../Skeleton/organisms";

import { IQueryBar } from "../../../../Types/QueryBar";

import { QUERY_LIMIT, SEARCH_NAME } from "../../../../Constants";

const _Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    const [searchContent, setSearchContent] = useState('');

    const { products, fetchProducts, pageLimit, setPageLimit, isLoadingProducts } = useStoreZ();

    const count = Math.ceil(products.count / pageLimit) || 0;

    const onSearchFunction = useCallback((data: IQueryBar) => {
        // Always set on initial search
        setPage(1);
        setSearchContent(data.search)
    }, [setSearchContent, setPage]);

    useEffect(() => {
        const searchPage = Number(searchParams.get(SEARCH_NAME.PAGE));
        const searchLimit = Number(searchParams.get(SEARCH_NAME.LIMIT));
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

        if (searchContent) {
            setSearchContent(searchContent);
        }

        if (!searchPage || !searchLimit) {
            setSearchParams({ page: QUERY_LIMIT.PAGE.toString(), limit: QUERY_LIMIT.LIMIT.toString() });
        }
    }, []);

    useEffect(() => {
        if (page || pageLimit || searchContent)
            setSearchParams({ page: page.toString(), limit: pageLimit.toString(), content: searchContent });

        fetchProducts({ page: page, limit: pageLimit, searchContent });
    }, [fetchProducts, setSearchParams, pageLimit, page, searchContent]);

    return (
        <section className={'content__page'}>

            <SectionTitle content='Catalog with Books' />

            <QueryBar
                hasLeftSelector={false}
                onPressSearch={onSearchFunction}
            />

            {isLoadingProducts ? <ListRenderProductSkeletons limit={pageLimit} /> : <ListRenderProduct data={products?.rows || []} />}

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_Products);