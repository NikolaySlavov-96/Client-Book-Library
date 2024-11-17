import { FC, memo, useMemo } from "react";

import { List } from "../../../component/atoms";
import { BookCardSkeleton } from "../../molecules";

import styles from './_ListRenderBookSkeleton.module.css';

type IType = { [key: number]: string };

const keyExtractor = (item: IType) => item.toString();
const renderItem = ({ item }: { item: { [key: number]: string } }) => {
    return (<BookCardSkeleton />)
};

interface IListRenderBookSkeletonProps {
    limit: number;
}

const _ListRenderBookSkeleton: FC<IListRenderBookSkeletonProps> = (props) => {
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

export default memo(_ListRenderBookSkeleton);