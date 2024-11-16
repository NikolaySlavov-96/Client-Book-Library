import { Fragment, memo, useCallback } from "react";

import { IListProps } from '../../../Types/Components';

const _List = <ItemT,>(props: IListProps<ItemT>) => {
    const { data, renderItem, keyExtractor, EmptyComponent, ...rest } = props;

    const _renderItem = useCallback((item: any, index: number) => (
        <Fragment key={keyExtractor(item, index)}>
            {renderItem({
                item, index,
            })}
        </Fragment>
    ), [keyExtractor, renderItem]);

    return (
        <div {...rest}>
            {data.length === 0 ? EmptyComponent && <EmptyComponent /> : data.map(_renderItem)}
        </div>
    )
};

export default memo(_List);