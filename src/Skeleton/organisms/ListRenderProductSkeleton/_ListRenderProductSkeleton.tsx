import { FC, memo, useCallback, useMemo } from "react";

import { List } from "../../../component/atoms";
import { ListProductCardSkeleton, GridProductCardSkeleton } from "../../molecules";

import styles from './_ListRenderProductSkeleton.module.css';
import { TViewType } from "~/Types/Components";

type IType = { [key: number]: string };

const keyExtractor = (item: IType) => item.toString();

interface IListRenderProductSkeletonProps {
    limit: number;
    viewType: TViewType;
}

const component: Record<TViewType, any> = {
    list: ListProductCardSkeleton,
    grid: GridProductCardSkeleton,
}

const _ListRenderProductSkeleton: FC<IListRenderProductSkeletonProps> = (props) => {
    const { limit, viewType } = props;

    const renderedElements = useMemo(() => (
        Array.from({ length: limit }, (_, index) => index.toString())
    ), [limit]);

    const renderItem = useCallback(({ item }: { item: { [key: number]: string } }) => {
        const Component = component[viewType];
        return (<Component />)
    }, [viewType]);

    return (
        <List
            data={renderedElements}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles["list__item"]}
        />
    );
};

export default memo(_ListRenderProductSkeleton);