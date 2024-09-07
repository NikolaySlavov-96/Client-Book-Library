import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useService } from "../hooks/useService";

import { bookServiceFactory } from "../services/book";

import ROUT_NAMES from "../Constants/routNames";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const navigate = useNavigate();

    const [book, setBook] = useState({});
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(1);
    const [type, setType] = useState('');
    const [bookModal, setBookModal] = useState([]);

    const bookService = useService(bookServiceFactory);

    const [error, setError] = useState([]);

    const data = {
        'book': () => bookService.getProducts({ page, limit }),
        'forpurchase': () => bookService.getAllBooksByState({ page, limit, state: type }),
        'purchase': () => bookService.getAllBooksByState({ page, limit, state: type }),
        'forreading': () => bookService.getAllBooksByState({ page, limit, state: type }),
        'reading': () => bookService.getAllBooksByState({ page, limit, state: type }),
        'listened': () => bookService.getAllBooksByState({ page, limit, state: type }),
    }

    useEffect(() => {
        setBook({})
        // if (type !== '') {
        data['book']()
            .then(req => {
                setBook(req);
            });
        // }
    }, [page, limit, type]);

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
            const result = await bookService.searchBook(search, { page, limit }, 'book'); //type === book
            setBook(result);
        } catch (err) {
            setError(err.message);
        }
    }

    const addingBookInList = async (bookId, state) => {
        try {
            const result = await bookService.addBookToLibrary({ bookId, state });
            console.log("🚀 ~ addingBookInList ~ result:", result)
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