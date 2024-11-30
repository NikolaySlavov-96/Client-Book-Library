import { FC, memo, useMemo } from "react";

import { List } from "../../../component/atoms";
import { ProductCardSkeleton } from "../../molecules";

import styles from './_ListRenderProductSkeleton.module.css';

type IType = { [key: number]: string };

const keyExtractor = (item: IType) => item.toString();
const renderItem = ({ item }: { item: { [key: number]: string } }) => {
    return (<ProductCardSkeleton />)
};

interface IListRenderProductSkeletonProps {
    limit: number;
}

const _ListRenderProductSkeleton: FC<IListRenderProductSkeletonProps> = (props) => {
    const { limit } = props;

    const renderedElements = useMemo(() => (
        Array.from({ length: limit }, (_, index) => index.toString())
    ), [limit]);

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