import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useService } from "../hooks";

import { BookService } from "../services";

import { ROUT_NAMES } from "../Constants";

import { IBookData } from "~/Types/Book";

interface IBookArray {
    count: number;
    rows: IBookData[];
}

interface IBookContext {
    limit: number;
    book: IBookArray;
    states: never[];
    isLoading: boolean;
    loadingBooks: (data: any) => void;
    loadingBookCollection: (data: any) => void;
    getBookById: (id: string) => void;
    loadingBookFromEmail: (data: any) => void;
    setLimit: Dispatch<SetStateAction<number>>;
    getStateOnBookById: (id: string) => void;
    onSubmitCreateProduct: (data: any) => void;
    addingBookInList: (bookId: string, state: string) => void;
}

const BookContext = createContext<IBookContext | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [states, setState] = useState([]);

    const [book, setBook] = useState<IBookArray>({ count: 0, rows: [] });

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


    const loadingBookFromEmail = useCallback(async (data: any) => {
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

    const loadingBooks = useCallback(async (data: any) => {
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

    const loadingBookCollection = useCallback(async (data: any) => {
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

    const getBookById = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const isExistingBook = book.rows && book?.rows.filter(b => b.bookId === Number(id));
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
    }, [])

    const getStateOnBookById = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const result = await bookService.getBookState(id);
            return result;
        } catch (err) {
            console.log('getStateOnBookById --->: ', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const onSubmitCreateProduct = useCallback(async (data: any) => {
        try {
            await bookService.createProduct(data);
            // TODO Adding new added book
            navigate(ROUT_NAMES.HOME);
        } catch (err) {
            console.log('onSubmitCreateProduct --->: ', err);
        }
    }, []);

    const onSubmitEditProduct = useCallback(async (data: any) => {
        try {
            const prod = await bookService.editProduct(data._id, data);
            // setBook(p => p?.rows.map(x => x.id === data.id ? prod : x));

            navigate(ROUT_NAMES.HOME);
        } catch (err) {
            console.log('onSubmitEditProduct --->: ', err);
        }
    }, []);

    const onSubmitDeleteProduct = useCallback(async (id: string) => {
        try {
            await bookService.deleteProduct(id);
            // setBook(p => p.filter(prod => prod._id !== id));

            navigate(ROUT_NAMES.HOME);
        } catch (err) {
            console.log('onSubmitDeleteProduct --->: ', err);
        }
    }, []);

    const addingBookInList = useCallback(async (bookId: string, state: string) => {
        try {
            const result = await bookService.addBookToLibrary({ bookId, state });
            // TODO Visualize message
        } catch (err) {
            console.log('addingBookInList --->: ', err);
        }
    }, []);

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
        // onSubmitEditProduct,
        // onSubmitDeleteProduct,
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
    if (!context) {
        throw new Error('useBookContext must be used within a BookContextProvider');
    }
    return context;
}