import { memo, useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { IconActionButton } from "../../../atoms";
import { BookDetails, Select } from "../../../molecules";

import { BookDetailSkeleton, SelectSkeleton } from "../../../../Skeleton/molecules";

import { useAuthContext } from "../../../../contexts/AuthContext";

import { useStoreZ } from "../../../../hooks";

import { FormatSelectOptions } from "../../../../Helpers";

import style from './_DetailsForBook.module.css';

const createBookOptions = (bookState: any, mappedStates: any) => {
    return mappedStates.filter((b: any) => b.value !== bookState)
}

const DEFAULT_MESSAGE = 'Please select...';

const _DetailsForBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { email } = useAuthContext();
    const { productStates, fetchProductById, productById, isLoadingProduct, fetchProductState, addingProductState, productState } = useStoreZ();

    const mappedStates = useMemo(() => {
        const data = FormatSelectOptions(productStates, { value: 'id', label: 'stateName' });
        return data;
    }, [productStates]);

    const changeState = useCallback((e: any, id: string) => {
        const state = e.value;
        addingProductState(id, state);
    }, [addingProductState]);

    const onPressBackButton = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const selectedLabel = useMemo(() => (
        typeof productState?.stateId === 'number' && mappedStates.length ? mappedStates[productState.stateId - 1].label : DEFAULT_MESSAGE
    ), [mappedStates, productState?.stateId]);

    const selectOptions = useMemo(() => (
        createBookOptions(productState?.stateId, mappedStates)
    ), [productState?.stateId, mappedStates]);

    useEffect(() => {
        const productId = id?.toString();
        if (productId && productId !== '0') {
            fetchProductById(productId);
        }
    }, [id, fetchProductById]);

    useEffect(() => {
        const productId = id?.toString();
        if (!!email && productId && productId !== '0') {
            fetchProductState(productId);
        }
    }, [id, fetchProductState, email])

    const productId = productById?.bookId?.toString();
    if (!isLoadingProduct && productId === '0') {
        return null;
    }

    return (
        <section className={style['detail__card']}>

            <IconActionButton onClick={onPressBackButton} />

            <div className={style['productById-card__detail']}>
                {isLoadingProduct ?
                    <BookDetailSkeleton /> :
                    <BookDetails {...productById} />}
            </div>

            {!!email ?
                isLoadingProduct ?
                    <SelectSkeleton />
                    : (
                        <div className={`${style['functionality']}`}>
                            <Select
                                options={selectOptions}
                                placeHolder={selectedLabel}
                                onChange={(e) => changeState(e, productId)}
                                size='70'
                            />
                        </div>)
                : null
            }
        </section>
    );
}

export default memo(_DetailsForBook);