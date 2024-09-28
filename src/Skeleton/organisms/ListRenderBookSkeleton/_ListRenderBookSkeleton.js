import { memo, useCallback, useMemo } from "react";

import { BookCardSkeleton } from "../../molecules";

import styles from './_ListRenderBookSkeleton.module.css';

const _ListRenderBookSkeleton = (props) => {
    const { limit } = props;

    const renderedElements = useMemo(() => (
        Array.from({ length: limit }, (_, index) => index.toString())
    ), [limit]);

    const RenderComponent = useCallback(() => {
        return renderedElements?.map(e => <BookCardSkeleton key={e} {...e} />)
    }, [renderedElements]);

    return (
        <div className={styles["list__item"]}>
            <RenderComponent />
        </div>
    );
};

export default memo(_ListRenderBookSkeleton);