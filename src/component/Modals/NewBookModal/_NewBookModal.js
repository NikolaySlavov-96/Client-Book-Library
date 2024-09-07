import { memo, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { useBookContext } from '../../../contexts/BookContext';

import ROUT_NAMES from '../../../Constants/routNames';

import style from './_NewBookModal.module.css';

const _NewBookModal = () => {
    const { bookModal } = useBookContext();

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (bookModal.length !== 0) {
            setIsVisible(true);
        }
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 5000);

        return () => clearTimeout(timer);
    }, [bookModal.length]);

    if (!isVisible) {
        return null;
    }

    const lastBook = bookModal.length - 1;

    return (
        <Link
            to={`${ROUT_NAMES.BOOK}/${bookModal[lastBook]?.id}`}
            className={`${style['container']} ${!isVisible ? '' : style['visible']}`}
        >
            <h3>Lastly added books</h3>
            <div>
                <h1>{bookModal[lastBook]?.bookTitle}</h1>
            </div>
            <p>Added before 10 second</p>
        </Link>
    )
}

export default memo(_NewBookModal);