import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { Select, SearchField } from "../../molecules";

import { useBookContext } from "../../../contexts/BookContext";

import { SEARCH_NAME } from "../../../Constants";

import { useForm } from "../../../hooks";

import { TOptionType } from "~/Types/Select";

import style from './_QueryBar.module.css';

// TODO Moving
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

interface IQueryBarProps {
    hasLeftSelector: boolean;
    onPressSearch: (e: any) => void;
    leftSelectData?: number;
    leftSelectorData?: TOptionType[];
    onPressLeftSelector?: Dispatch<SetStateAction<number>>,
}

const _QueryBar: FC<IQueryBarProps> = (props) => {
    const {
        leftSelectorData,
        hasLeftSelector,
        leftSelectData,
        onPressLeftSelector,
        onPressSearch,
    } = props;

    const [searchParams, setSearchParams] = useSearchParams();

    const { setLimit } = useBookContext();

    const { values, changeHandler, onSubmit } = useForm({
        search: '',
    }, onPressSearch, {
        search: ['required', 2]
    }, false);

    const currentLimitParam = searchParams.get(SEARCH_NAME.LIMIT);

    const pageLimit = useCallback((e: TOptionType) => {
        const pageSize = e.value;
        setLimit(pageSize);
        setSearchParams(prev => ({ ...prev, limit: pageSize }));
    }, [setLimit, setSearchParams]);

    const changeState = useCallback((e: TOptionType) => {
        const state = Number(e.value);
        onPressLeftSelector && onPressLeftSelector(state);
    }, [onPressLeftSelector]);

    return (
        <div className={`global__bg-radius ${style['container']}`}>
            {hasLeftSelector ? <Select
                options={leftSelectorData || []}
                placeHolder={(leftSelectorData && leftSelectData) ? leftSelectorData[leftSelectData - 1].label : ''}
                onChange={changeState}
                size={'240'}
            /> : <div></div>}

            <SearchField
                values={values as { search: string }}
                changeHandler={changeHandler}
                onSubmit={onSubmit}
            />

            <Select
                options={pageSizeOptions}
                placeHolder={currentLimitParam || ''}
                onChange={pageLimit}
                size={'70'}
            />
        </div>
    );
};

export default memo(_QueryBar);