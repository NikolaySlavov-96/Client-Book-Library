import { memo, useEffect, useMemo } from "react";

import { useBookContext } from "../../../../contexts/BookContext";

import { Pagination, QueryBar, ListRenderBook } from "../../../UI";

import { SelectMapper } from "../../../../Helpers";
import { DEFAULT_LOADED_COLLECTION } from "../../../../Constants/_collection";

import style from './_UserCollection.module.css';


const _UserCollection = () => {

    const { setType, book, page, limit, setPage, states } = useBookContext({});

    const mappedStates = useMemo(() => {
        const data = SelectMapper(states, { value: 'id', label: 'stateName' });
        return data;
    }, [states]);

    const count = Math.ceil(book.count / limit) || 0;

    useEffect(() => {
        setType(DEFAULT_LOADED_COLLECTION);
    }, [setType])

    return (
        <section className={style["body__card"]}>
            <h1>Collection of Books</h1>

            <QueryBar
                hasLeftSelector={mappedStates.length}
                mappedStates={mappedStates}
            />

            <ListRenderBook data={book?.rows || {}} />

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_UserCollection);