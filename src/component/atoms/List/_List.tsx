import { Fragment, useCallback } from "react";

import { IListProps } from '../../../Types/Components';

const _List = <ItemT,>(props: IListProps<ItemT>) => {
    const { data, renderItem, keyExtractor, EmptyComponent, style, ...rest } = props;

    const _renderItem = useCallback((item: any, index: number) => (
        <Fragment key={keyExtractor(item, index)}>
            {renderItem({
                item, index,
            })}
        </Fragment>
    ), [keyExtractor, renderItem]);

    return (
        <div className={style} {...rest}>
            {data.length === 0 ? EmptyComponent && <EmptyComponent /> : data.map(_renderItem)}
        </div>
    )
};

// With "memo" i have the problem at use on component
export default _List;