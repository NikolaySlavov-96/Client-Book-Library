import { memo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { Select, SearchField } from "../../molecules";

import { useBookContext } from "../../../contexts/BookContext";

import { SEARCH_NAME } from "../../../Constants";

import { useForm } from "../../../hooks/useForm";

import style from './_QueryBar.module.css';

const pageSizeOptions = [
    {
        label: '12',
        value: '12',
    },
    {
        label: '24',
        value: '24',
    },
    {
        label: '36',
        value: '36',
    },
    {
        label: '72',
        value: '72',
    },
]

const _QueryBar = (props) => {
    const {
        leftSelectorData,
        hasLeftSelector,
        leftSelectData,
        onPressLeftSelector,
    } = props;

    const [searchParams, setSearchParams] = useSearchParams();

    const { setLimit, onSubmitSearchWithInput } = useBookContext({});

    const { values, changeHandler, onSubmit } = useForm({
        search: '',
    }, onSubmitSearchWithInput, {
        search: ['required', '2']
    }, false);

    const currentLimitParam = searchParams.get(SEARCH_NAME.LIMIT);

    const pageLimit = useCallback((e) => {
        const pageSize = e.value;
        setLimit(pageSize);
        setSearchParams(prev => ({ ...prev, limit: pageSize }));
    }, [setLimit, setSearchParams]);

    const changeState = useCallback((e) => {
        const state = e.value
        onPressLeftSelector(state);
    }, [onPressLeftSelector]);

    return (
        <div className={`global__bg-radius ${style['container']}`}>
            {hasLeftSelector ? <Select
                options={leftSelectorData}
                placeHolder={leftSelectorData[leftSelectData - 1].label}
                onChange={changeState}
                size={'240'}
            /> : <div></div>}

            <SearchField
                values={values}
                changeHandler={changeHandler}
                onSubmit={onSubmit}
            />

            <Select
                options={pageSizeOptions}
                placeHolder={currentLimitParam}
                onChange={pageLimit}
                size={'70'}
            />
        </div>
    );
};

export default memo(_QueryBar);