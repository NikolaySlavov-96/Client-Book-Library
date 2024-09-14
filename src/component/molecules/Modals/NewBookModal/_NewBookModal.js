import { memo, useEffect } from 'react';
import { Link } from "react-router-dom";

import { ROUT_NAMES } from '../../../../Constants';

import { useStoreZ } from '../../../../hooks';

import style from './_NewBookModal.module.css';

const _NewBookModal = () => {
    const { content, isVisible, closeModal} = useStoreZ();

    useEffect(() => {
        const timer = setTimeout(() => {
            closeModal()
        }, 5000);

        return () => clearTimeout(timer);
    }, [closeModal]);

    if (!isVisible) {
        return null;
    }

    const lastBook = content.length - 1;

    return (
        <Link
            to={`${ROUT_NAMES.BOOK}/${content[lastBook]?.id}`}
            className={`${style['container']} ${!isVisible ? '' : style['visible']}`}
        >
            <h3>Lastly added books</h3>
            <div>
                <h1>{content[lastBook]?.bookTitle}</h1>
            </div>
            <p>Added before 10 second</p>
        </Link>
    )
}

export default memo(_NewBookModal);