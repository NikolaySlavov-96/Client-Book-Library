import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { Select, SearchField, LayoutIcon } from "../../molecules";

import { SEARCH_NAME } from "../../../constants";

import { useForm, useStoreZ } from "../../../hooks";

import { TOptionType } from "../../../Types/Select";
import { IQueryBar } from "../../../Types/QueryBar";

import style from './_QueryBar.module.css';
import { TViewType } from "~/Types/Components";

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
    onPressSearch: ({ search }: IQueryBar) => void;
    leftSelectData?: number;
    leftSelectorData?: TOptionType[];
    onPressLeftSelector?: Dispatch<SetStateAction<number>>,
    viewType?: TViewType,
    onPressViewType?: (viewTypeParam: TViewType) => void,
}

const _QueryBar: FC<IQueryBarProps> = (props) => {
    const {
        leftSelectorData,
        hasLeftSelector,
        leftSelectData,
        onPressLeftSelector,
        onPressSearch,
        viewType,
        onPressViewType,
    } = props;

    const [searchParams, setSearchParams] = useSearchParams();

    const { setPageLimit } = useStoreZ();

    const { values, changeHandler, onSubmit } = useForm({
        search: '',
    }, onPressSearch, {
        search: ['required', 2]
    }, false);

    const currentLimitParam = searchParams.get(SEARCH_NAME.LIMIT);

    const pageLimit = useCallback((e: TOptionType) => {
        const pageSize = e.value;
        setPageLimit(Number(pageSize));
        setSearchParams(prev => ({ ...prev, limit: pageSize }));
    }, [setPageLimit, setSearchParams]);

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
                values={values as unknown as IQueryBar}
                changeHandler={changeHandler}
                onSubmit={onSubmit}
            />

            {onPressViewType && viewType ? (<LayoutIcon typeView={viewType} onChange={onPressViewType} />) : null}

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