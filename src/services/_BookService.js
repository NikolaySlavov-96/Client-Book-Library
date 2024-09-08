import { API } from '../Helpers';

const PREFIX = '/api/book'

const _BookServiceFactory = (token) => {
    const request = API(token);

    // Book Services
    const getProducts = async ({ page, limit }) => request.get(`${PREFIX}?limit=${limit}&page=${page}`);

    const getProduct = async (id) => request.get(`${PREFIX}/` + id);

    const createProduct = async (data) => request.post(`${PREFIX}`, data);

    const editProduct = async (id, data) => request.put(`${PREFIX}/` + id, data);

    const deleteProduct = async (id) => request.remove(`${PREFIX}/` + id);

    const searchBook = async ({ content, page, limit }) => request.get(`/api/search/books?search=${content}&limit=${limit}&page=${page}`)


    // BookState Services
    const getAllBooksByState = async ({ page, limit, state }) => request.get(`${PREFIX}/booksState/${state}?limit=${limit}&page=${page}`);

    const getBookState = async (id) => request.get(`${PREFIX}/bookState/` + id);

    const addBookToLibrary = async (data) => request.post(`/api/book/state`, data);

    return {
        getProducts,
        getProduct,
        createProduct,
        editProduct,
        deleteProduct,
        searchBook,
        getAllBooksByState,
        getBookState,
        addBookToLibrary,
    }
}

export default _BookServiceFactory;