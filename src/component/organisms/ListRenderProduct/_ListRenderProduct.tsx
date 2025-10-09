import { FC, memo, useCallback, useMemo } from "react";

import { List } from "../../atoms";
import { ProductCard } from "..";

import { TProductCard } from "../../../Types/Product";

import styles from './_ListRenderProduct.module.css';
import { TViewType } from "~/Types/Components";


const emptyComponent = () => (< h2 > There are no items added yet.</h2>);

const keyExtractor = (item: TProductCard) => item?.productId.toString();

interface IListRenderProductProps {
    data: TProductCard[];
    viewType: TViewType,
}

const _ListRenderProduct: FC<IListRenderProductProps> = (props) => {
    const { data, viewType } = props;

    const containerStyles = useMemo(() => {
        if (viewType === 'row') {
            return `${styles.item} ${styles[`${viewType}__item`]}`
        }
        return styles['item']
    }, [viewType])

    const renderItem = useCallback(({ item }: { item: TProductCard }) => {
        return <ProductCard {...item} viewType={viewType} />
    }, [viewType]);

    return (
        <List
            data={data}
            EmptyComponent={emptyComponent}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={containerStyles}
        />
    );
};

export default memo(_ListRenderProduct);