import { FC, memo } from "react";

import { List } from "../../atoms";
import { ProductCard } from "..";

import { TProductCard } from "../../../Types/Product";

import styles from './_ListRenderProduct.module.css';


const emptyComponent = () => (< h2 > There are no items added yet.</h2>);
const keyExtractor = (item: TProductCard) => item?.productId.toString();
const renderItem = ({ item }: { item: TProductCard }) => {
    return (<ProductCard {...item} />)
};

interface IListRenderProductProps {
    data: TProductCard[];
}

const _ListRenderProduct: FC<IListRenderProductProps> = (props) => {
    const { data } = props;

    return (
        <List
            data={data}
            EmptyComponent={emptyComponent}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles["list__item"]}
        />
    );
};

export default memo(_ListRenderProduct);