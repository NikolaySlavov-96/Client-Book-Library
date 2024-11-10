import { createContext, ReactNode, useCallback, useContext } from "react";

import { BookService as bookService } from "../services";

interface IBookContext {
    onSubmitCreateProduct: (data: any) => any;
    onSendFile: (data: any) => any;
}

const BookContext = createContext<IBookContext | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
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

    const contextValue = {
        // onSubmitDeleteProduct,
        // onSubmitEditProduct,
        onSendFile,
        onSubmitCreateProduct,
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