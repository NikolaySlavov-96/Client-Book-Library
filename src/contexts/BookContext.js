import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useService } from "../hooks/useService";

import { BookService } from "../services";

import { ROUT_NAMES } from "../Constants";

const BOOK_TYPE = 0;

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const navigate = useNavigate();

    const [states, setState] = useState([]);

    const [book, setBook] = useState({});
    const [searchEmail, setSearchEmail] = useState('');
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(1);
    const [type, setType] = useState(BOOK_TYPE); // Default type is "Book";
    const [bookModal, setBookModal] = useState([]);

    const bookService = useService(BookService);

    const [error, setError] = useState([]);

    const loadingAllStatesForBook = useCallback(async () => {
        try {
            const result = await bookService.getStates();
            setState(result);
        } catch (err) {
            console.log('loadingAllStatesForBook --->: ', err);
        }
    }, []);

    useEffect(() => {
        loadingAllStatesForBook();
    }, []);

    const LoadingBookFromEmail = useCallback(async (data) => {
        try {
            if (data.content !== '') { // Search By email
                const result = await bookService.searchBookByEmailOnUser(data);
                setBook(result);
                return
            }
        } catch (err) {
            console.log('LoadingBookFromEmail --->: ', err);
        }
    }, []);

    useEffect(() => {
        LoadingBookFromEmail({ content: searchEmail });
    }, [searchEmail])

    const LoadingBooks = useCallback(async (data) => {
        try {
            if (data.type === BOOK_TYPE) {
                const result = await bookService.getProducts(data);
                setBook(result);
                return
            }

            if (Number(data.type)) {
                const result = await bookService.getAllBooksByState(data);
                setBook(result);
            }
        } catch (err) {
            console.log('LoadingBooks --->: ', err);
        }
    }, []);

    useEffect(() => {
        setBook({})
        LoadingBooks({ page, limit, type });
    }, [LoadingBooks, page, limit, type]);

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
        states,
        bookModal,
        getBookById,
        setSearchEmail,
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