import { memo, useEffect, useState, } from "react";

import { useParams } from "react-router-dom";

import { SectionTitle } from "../../../atoms";
import { Pagination } from "../../../molecules";
import { QueryBar, ListRenderProduct } from "../../../organisms";

import { useStoreZ, useViewType } from "../../../../hooks";
import { ListRenderProductSkeletons } from "../../../../Skeleton/organisms";

const SECTION_TITLE = 'Review user books - ??with email';

const _SearchByEmail = () => {
    const param = useParams();

    const [page, setPage] = useState(1);

    const { viewType, onChangeViewType } = useViewType();
    const { isLoadingProductByEmails, pageLimit, productByEmail, fetchProductsForEmail } = useStoreZ();

    const count = Math.ceil(productByEmail.count / pageLimit) || 0;

    useEffect(() => {
        if (param.email !== '') {
            fetchProductsForEmail({ searchContent: param.email || '', limit: pageLimit, page, })
        }
    }, [fetchProductsForEmail, param.email, pageLimit, page])

    return (
        <section className={'content__page'}>

            <SectionTitle content={SECTION_TITLE} />

            <QueryBar
                hasLeftSelector={false}
                // TODO 
                onPressSearch={(data) => console.log('SearchByEmail', data)}
                viewType={viewType}
                onPressViewType={onChangeViewType}
            />

            {isLoadingProductByEmails ? (
                <ListRenderProductSkeletons limit={pageLimit} viewType={viewType} />) : (
                <ListRenderProduct data={productByEmail?.rows || []} viewType={viewType} />
            )}

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_SearchByEmail);