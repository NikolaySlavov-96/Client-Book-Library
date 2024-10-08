import { memo, useEffect, useState, } from "react";

import { useParams } from "react-router-dom";

import { SectionTitle } from "../../../atoms";
import { Pagination } from "../../../molecules";
import { QueryBar, ListRenderBook } from "../../../organisms";

import { useBookContext } from "../../../../contexts/BookContext";

const SECTION_TITLE = 'Review user books - ??with email';

const _SearchByEmail = () => {
    const param = useParams();

    const [page, setPage] = useState(1);

    const { book, limit, loadingBookFromEmail } = useBookContext();

    const count = Math.ceil(book.count / limit) || 0;

    useEffect(() => {
        loadingBookFromEmail({ content: param.email })
    }, [loadingBookFromEmail, param.email])

    return (
        <section className={'content__page'}>

            <SectionTitle content={SECTION_TITLE} />

            <QueryBar
                hasLeftSelector={false}
                // TODO 
                onPressSearch={(data) => console.log('SearchByEmail', data)}
            />

            <ListRenderBook data={book?.rows || []} />

            <Pagination count={count} page={page} onSubmit={setPage} />
        </section >
    );
}

export default memo(_SearchByEmail);