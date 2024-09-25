import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useService } from "../hooks/useService";

import { BookService } from "../services";

import { ROUT_NAMES } from "../Constants";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [states, setState] = useState([]);

    const [book, setBook] = useState({});

    const [limit, setLimit] = useState(12);

    const bookService = useService(BookService);


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
    }, [loadingAllStatesForBook]);


    const loadingBookFromEmail = useCallback(async (data) => {
        setIsLoading(true);
        try {
            if (data.content !== '') { // Search By email
                const result = await bookService.searchBookByEmailOnUser(data);
                setBook(result);
                return
            }
        } catch (err) {
            console.log('LoadingBookFromEmail --->: ', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loadingBooks = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const result = await bookService.getProducts(data);
            setBook(result);
        } catch (err) {
            console.log('loadingBooks --->: ', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loadingBookCollection = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const result = await bookService.getAllBooksByState(data);
            setBook(result);
        } catch (err) {
            console.log('loadingBookCollection --->: ', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getBookById = async (id) => {
        setIsLoading(true);
        try {
            const isExistingBook = book.rows && book?.rows.filter(b => b.id === Number(id));
            if (isExistingBook?.length) {
                return isExistingBook[0];
            }

            const result = await bookService.getProduct(id)
            return result;
        } catch (err) {
            console.log('loadingBookById --->: ', err);
        } finally {
            setIsLoading(false);
        }
    }

    const getStateOnBookById = async (id) => {
        setIsLoading(true);
        try {
            const result = await bookService.getBookState(id);
            return result;
        } catch (err) {
            console.log('getStateOnBookById --->: ', err);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmitCreateProduct = async (data) => {
        try {
            await bookService.createProduct(data);
            // TODO Adding new added book
            navigate(ROUT_NAMES.HOME);
        } catch (err) {
            console.log('onSubmitCreateProduct --->: ', err);
        }
    }

    const onSubmitEditProduct = async (data) => {
        try {
            const prod = await bookService.editProduct(data._id, data);
            setBook(p => p.map(x => x._id === data._id ? prod : x));

            navigate(ROUT_NAMES.HOME);
        } catch (err) {
            console.log('onSubmitEditProduct --->: ', err);
        }
    }

    const onSubmitDeleteProduct = async (id) => {
        try {
            await bookService.deleteProduct(id);
            setBook(p => p.filter(prod => prod._id !== id));

            navigate(ROUT_NAMES.HOME);
        } catch (err) {
            console.log('onSubmitDeleteProduct --->: ', err);
        }
    }

    const addingBookInList = async (bookId, state) => {
        try {
            const result = await bookService.addBookToLibrary({ bookId, state });
            // TODO Visualize message
        } catch (err) {
            console.log('addingBookInList --->: ', err);
        }
    }

    const contextValue = {
        setLimit,
        limit,
        book,
        states,
        isLoading,
        loadingBooks,
        loadingBookCollection,
        getBookById,
        loadingBookFromEmail,
        getStateOnBookById,
        onSubmitCreateProduct,
        onSubmitEditProduct,
        onSubmitDeleteProduct,
        addingBookInList,
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