import { memo, useCallback } from "react";

import { BookCard } from "../../molecules";

import styles from './_ListRenderBook.module.css';

const _ListRenderBook = (props) => {
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