import { FC, memo } from "react";

import { List } from "../../atoms";
import { BookCard } from "../../organisms";

import { TBookCard } from "../../../Types/Book";

import styles from './_ListRenderBook.module.css';


const emptyComponent = () => (< h2 > There are no items added yet.</h2>);
const keyExtractor = (item: TBookCard) => item?.productId.toString();
const renderItem = ({ item }: { item: TBookCard }) => {
    return (<BookCard {...item} />)
};

interface IListRenderBookProps {
    data: TBookCard[];
}

const _ListRenderBook: FC<IListRenderBookProps> = (props) => {
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

export default memo(_ListRenderBook);