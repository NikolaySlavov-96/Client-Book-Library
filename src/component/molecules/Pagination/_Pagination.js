import { memo, useCallback } from 'react';

import style from './_Pagination.module.css';
import { Button } from '../../atoms';

const PaginationButton = (props) => {
    const { onSubmit, content } = props;

    return (
        <Button styles={style["page"]} onClick={onSubmit} content={content} />
    )
};

const _Pagination = ({ count, page, onSubmit }) => {

    const onPressArrowBack = useCallback(() => {
        (page - 1) > 0 && onSubmit(page - 1)
    }, [onSubmit, page]);

    const onPressArrowNext = useCallback(() => {
        const isLastPage = count >= (page + 1);

        return !isLastPage ? () => { } : onSubmit(page + 1);
    }, [count, page, onSubmit]);

    return (
        <div className={style['container']}>
            <PaginationButton content='&#x3c;' onSubmit={onPressArrowBack} />
            {
                page - 2 > 0 && (
                    <PaginationButton content={page - 2} onSubmit={() => onSubmit(page - 2)} />
                )
            }
            {
                page - 1 > 0 && (
                    <PaginationButton content={page - 1} onSubmit={() => onSubmit(page - 1)} />
                )
            }
            <p className={`${style["current__page"]} ${style["page"]}`} >{page}</p>
            {
                count >= page + 1 && (
                    <PaginationButton content={page + 1} onSubmit={() => onSubmit(page + 1)} />
                )
            }
            {
                count >= page + 2 && (
                    <PaginationButton content={page + 2} onSubmit={() => onSubmit(page + 2)} />
                )
            }
            <PaginationButton content='&#x3e;' onSubmit={onPressArrowNext} />
        </div>
    );
}

export default memo(_Pagination);