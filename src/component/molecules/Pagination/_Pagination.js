import { memo, useCallback } from 'react';

import { Button } from '../../atoms';

import style from './_Pagination.module.css';

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
        const hasNextPage = count >= (page + 1);

        return hasNextPage ? onSubmit(page + 1) : () => { };
    }, [count, page, onSubmit]);

    const twoPagesBefore = page - 2;
    const onePageBefore = page - 1;
    const onePageAhead = page + 1;
    const twoPagesAhead = page + 2;

    return (
        <div className={style['container']}>
            <PaginationButton content='&#x3c;' onSubmit={onPressArrowBack} />
            {
                twoPagesBefore > 0 && (
                    <PaginationButton content={twoPagesBefore} onSubmit={() => onSubmit(twoPagesBefore)} />
                )
            }
            {
                onePageBefore > 0 && (
                    <PaginationButton content={onePageBefore} onSubmit={() => onSubmit(onePageBefore)} />
                )
            }
            <p className={`${style["current__page"]} ${style["page"]}`} >{page}</p>
            {
                count >= onePageAhead && (
                    <PaginationButton content={onePageAhead} onSubmit={() => onSubmit(onePageAhead)} />
                )
            }
            {
                count >= twoPagesAhead && (
                    <PaginationButton content={twoPagesAhead} onSubmit={() => onSubmit(twoPagesAhead)} />
                )
            }
            <PaginationButton content='&#x3e;' onSubmit={onPressArrowNext} />
        </div>
    );
}

export default memo(_Pagination);