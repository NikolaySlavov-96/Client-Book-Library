import { memo, useCallback } from "react";

import { Select, SearchField } from "../../molecules";

import { useBookContext } from "../../../contexts/BookContext";

import { DEFAULT_LOADED_COLLECTION } from "../../../Constants/_collection";

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
    const { mappedStates, hasLeftSelector } = props;

    const { setType, setLimit, onSubmitSearchWithInput } = useBookContext({});

    const changeState = useCallback((e) => {
        const state = e.value
        setType(state)
    }, [setType]);

    const { values, changeHandler, onSubmit } = useForm({
        search: '',
    }, onSubmitSearchWithInput, {
        search: ['required', '2']
    }, false);


    const pageLimit = useCallback((e) => {
        const pageSize = e.value;
        setLimit(pageSize);
    }, [setLimit]);

    return (
        <div className={`global__bg-radius ${style['container']}`}>
            {hasLeftSelector ? <Select
                options={mappedStates}
                placeHolder={mappedStates[DEFAULT_LOADED_COLLECTION].label}
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
                placeHolder={'12'}
                onChange={pageLimit}
                size={'70'}
            />
        </div>
    );
};

export default memo(_QueryBar);