import { memo, useEffect } from "react";

import { useBookContext } from "../../../../contexts/BookContext";

import { Pagination } from "../../../molecules";
import { QueryBar, ListRenderBook } from "../../../organisms";

import style from './_Book.module.css';

const _Books = () => {
    const { setType, book, page, limit, setPage } = useBookContext({});

    const count = Math.ceil(book.count / limit) || 0;

    useEffect(() => {
        setType(0);
    }, [setType])

    return (
        <section className={style["body__card"]}>
            <h1>Catalog with Books</h1>

            <QueryBar
                hasLeftSelector={false}
            />

            <ListRenderBook data={book?.rows || {}} />

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_Books);