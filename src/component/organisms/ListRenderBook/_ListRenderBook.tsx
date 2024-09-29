import { FC, memo, useCallback } from "react";

import { BookCard } from "../../organisms";

import { IBookData } from "~/Types/Book";

import styles from './_ListRenderBook.module.css';

interface IListRenderBookProps {
    data: IBookData[];
}

const _ListRenderBook: FC<IListRenderBookProps> = (props) => {
    const { data } = props;

    const RenderComponent = useCallback(() => {
        if (!data.length) {
            return (
                <h2>There are no items added yet.</h2>
            );
        }

        return data?.map(e => <BookCard key={e.bookId} {...e} />)
    }, [data]);

    return (
        <div className={styles["list__item"]}>
            <RenderComponent />
        </div>
    );
};

export default memo(_ListRenderBook);