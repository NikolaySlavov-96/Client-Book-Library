import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from "react";

import { BookService as bookService } from "../services";

import { IGetStatesResponse } from "~/Types/services/BookService";

interface IBookArray {
    count: number;
    rows: any[];
}

interface IBookContext {
    limit: number;
    book: IBookArray;
    states: IGetStatesResponse[];
    isLoading: boolean;
    loadingBooks: (data: any) => void;
    loadingBookCollection: (data: any) => void;
    getBookById: (id: string) => any;
    loadingBookFromEmail: (data: any) => void;
    setLimit: Dispatch<SetStateAction<number>>;
    getStateOnBookById: (id: string) => any;
    onSubmitCreateProduct: (data: any) => any;
    onSendFile: (data: any) => any;
    addingBookInList: (bookId: string, state: string) => void;
}

const BookContext = createContext<IBookContext | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [states, setState] = useState<IGetStatesResponse[]>([]);

    const [book, setBook] = useState<IBookArray>({ count: 0, rows: [] });

    const [limit, setLimit] = useState(12);

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
            const result = await bookService.createProduct(data);
            // TODO Adding new added book
            return result;
        } catch (err) {
            console.log('onSubmitCreateProduct --->: ', err);
            throw err;
        }
    }, []);

    const onSendFile = useCallback(async (data: any) => {
        try {
            const result = await bookService.sendFile(data);
            return result;
        } catch (err) {
            console.log('onSendFile --->: ', err);
            throw err;
        }
    }, []);

    const onSubmitEditProduct = useCallback(async (data: any) => {
        try {
            const prod = await bookService.editProduct(data._id, data);
            // setBook(p => p?.rows.map(x => x.id === data.id ? prod : x));

            // navigate(ROUT_NAMES.HOME);
        } catch (err) {
            console.log('onSubmitEditProduct --->: ', err);
        }
    }, []);

    const onSubmitDeleteProduct = useCallback(async (id: string) => {
        try {
            await bookService.deleteProduct(id);
            // setBook(p => p.filter(prod => prod._id !== id));

            // navigate(ROUT_NAMES.HOME);
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
        // onSubmitDeleteProduct,
        // onSubmitEditProduct,
        addingBookInList,
        book,
        getBookById,
        getStateOnBookById,
        isLoading,
        limit,
        loadingBookCollection,
        loadingBookFromEmail,
        loadingBooks,
        onSendFile,
        onSubmitCreateProduct,
        setLimit,
        states,
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