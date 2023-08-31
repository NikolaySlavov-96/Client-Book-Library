import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../hooks/useService";
import { bookServiceFactory } from "../services/book";


const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const navigate = useNavigate();
    const [book, setBook] = useState({});
    const bookService = useService(bookServiceFactory);

    useEffect(() => {
        bookService.getProducts()
            .then(req => {
                console.log(req);
                setBook(req);
            });
    }, []);

    const getProduct = (id) => {
        return book.find(prod => prod._id === id);
    }

    const onSubmitCreateProduct = async (data) => {
        const prod = await bookService.createProduct(data);

        setBook(p => [...p, prod]);
        navigate('/product/catalog');
    }

    const onSubmitEditProduct = async (data) => {
        const prod = await bookService.editProduct(data._id, data);

        setBook(p => p.map(x => x._id === data._id ? prod : x));
        navigate('/product/catalog');
    }

    const onSubmitDeleteProduct = async (id) => {
        await bookService.deleteProduct(id);

        setBook(p => p.filter(prod => prod._id !== id));
        navigate('/product/catalog');
    }

    const contextValue = {
        book,
        getProduct,
        onSubmitCreateProduct,
        onSubmitEditProduct,
        onSubmitDeleteProduct,
    }

    return (
        < BookContext.Provider value={contextValue} >
            {children}
        </ BookContext.Provider >
    )
}


export const useBookContext = () => {
    const context = useContext(BookContext);
    return context;
}