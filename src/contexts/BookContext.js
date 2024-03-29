import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../hooks/useService";
import { bookServiceFactory } from "../services/book";


const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const navigate = useNavigate();
    const [book, setBook] = useState({});
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(1);
    const [type, setType] = useState('');
    const bookService = useService(bookServiceFactory);
    const [error, setError] = useState([]);

    const data = {
        'book': () => bookService.getProducts({ page, limit }, type),
        'forpurchase': () => bookService.getUserBooks({ page, limit }, type),
        'purchase': () => bookService.getUserBooks({ page, limit }, type),
        'forreading': () => bookService.getUserBooks({ page, limit }, type),
        'reading': () => bookService.getUserBooks({ page, limit }, type),
        'listened': () => bookService.getUserBooks({ page, limit }, type),
    }

    useEffect(() => {
        setBook({})
        if (type !== '') {
            data[type]()
                .then(req => {
                    setBook(req);
                });
        }
    }, [page, limit, type]);

    const getProduct = (id) => {
        return book.find(prod => prod._id === id);
    }

    const onSubmitCreateProduct = async (data) => {
        try {
            const prod = await bookService.createProduct(data);

            // setBook(p => [...p, prod]);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }

    const onSubmitEditProduct = async (data) => {
        try {
            const prod = await bookService.editProduct(data._id, data);

            setBook(p => p.map(x => x._id === data._id ? prod : x));
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }

    const onSubmitDeleteProduct = async (id) => {
        try {
            await bookService.deleteProduct(id);

            setBook(p => p.filter(prod => prod._id !== id));
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }

    const onSubmitSeachWithInput = async ({ search }) => {
        try {
            const result = await bookService.searchBook(search, { page, limit }, 'book'); //type === book
            setBook(result);
        } catch (err) {
            setError(err.message);
        }
    }

    const addingBookInList = async (id, type) => {
        try {
            const result = await bookService.addinBookInLib({ book_id: id }, type);
            console.log(result);
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
        getProduct,
        onSubmitCreateProduct,
        onSubmitEditProduct,
        onSubmitDeleteProduct,
        onSubmitSeachWithInput,
        addingBookInList,
        setType,
        type,
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