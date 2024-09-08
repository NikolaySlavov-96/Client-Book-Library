import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useService } from "../hooks/useService";

import { BookService } from "../services";

import { ROUT_NAMES, BOOK_COLLECTION } from "../Constants";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const navigate = useNavigate();

    const [book, setBook] = useState({});
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(1);
    const [type, setType] = useState(BOOK_COLLECTION.BOOK); // Default type is "Book";
    const [bookModal, setBookModal] = useState([]);

    const bookService = useService(BookService);

    const [error, setError] = useState([]);

    const data = useMemo(() => ({
        [BOOK_COLLECTION.BOOK]: ({ page, limit }) => bookService.getProducts({ page, limit }),
        [BOOK_COLLECTION.FOR_PURCHASE]: ({ page, limit, type }) => bookService.getAllBooksByState({ page, limit, state: type }),
        [BOOK_COLLECTION.PURCHASE]: ({ page, limit, type }) => bookService.getAllBooksByState({ page, limit, state: type }),
        [BOOK_COLLECTION.FOR_READING]: ({ page, limit, type }) => bookService.getAllBooksByState({ page, limit, state: type }),
        [BOOK_COLLECTION.READING]: ({ page, limit, type }) => bookService.getAllBooksByState({ page, limit, state: type }),
        [BOOK_COLLECTION.LISTENING]: ({ page, limit, type }) => bookService.getAllBooksByState({ page, limit, state: type }),
    }), [])

    useEffect(() => {
        setBook({})
        data[type]({ page, limit, type })
            .then(req => {
                setBook(req);
            });
    }, [page, limit, type, data]);

    const getBookById = async (id) => {
        const isExistingBook = book.rows && book?.rows.filter(b => b.id == id);
        if (isExistingBook?.length) {
            return isExistingBook[0];
        }
        const result = await bookService.getProduct(id)
        return result;
    }

    const getStateOnBookById = async (id) => {
        try {
            const result = await bookService.getBookState(id);
            return result;
        } catch (err) {
            setError(err.message)
        }
    };

    const onSubmitCreateProduct = async (data) => {
        try {
            await bookService.createProduct(data);
            // TODO Adding new added book
            navigate(ROUT_NAMES.HOME);
        } catch (err) {
            setError(err.message);
        }
    }

    const onSubmitEditProduct = async (data) => {
        try {
            const prod = await bookService.editProduct(data._id, data);
            setBook(p => p.map(x => x._id === data._id ? prod : x));

            navigate(ROUT_NAMES.HOME);
        } catch (err) {
            setError(err.message);
        }
    }

    const onSubmitDeleteProduct = async (id) => {
        try {
            await bookService.deleteProduct(id);
            setBook(p => p.filter(prod => prod._id !== id));

            navigate(ROUT_NAMES.HOME);
        } catch (err) {
            setError(err.message);
        }
    }

    const onSubmitSearchWithInput = async ({ search }) => {
        try {
            const result = await bookService.searchBook({ content: search, page, limit });
            setBook(result);
        } catch (err) {
            setError(err.message);
        }
    }

    const addingBookInList = async (bookId, state) => {
        try {
            const result = await bookService.addBookToLibrary({ bookId, state });
            // TODO Visualize message
        } catch (err) {
            setError(err.message);
        }
    }

    const contextValue = {
        setLimit,
        limit,
        setPage,
        page,
        book,
        error,
        bookModal,
        getBookById,
        getStateOnBookById,
        onSubmitCreateProduct,
        onSubmitEditProduct,
        onSubmitDeleteProduct,
        onSubmitSearchWithInput,
        addingBookInList,
        setType,
        setBookModal,
        type,
    }

    return (
        < BookContext.Provider value={contextValue}>
            {children}
        </ BookContext.Provider >
    )
}


export const useBookContext = () => {
    const context = useContext(BookContext);
    return context;
}