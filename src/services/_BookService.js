import { API } from '../Helpers';

const PREFIX = '/book'

const _BookServiceFactory = (token) => {
    const request = API(token);

    // Get book States ( id, title, symbol ) / For Reading, Reading and e.t.n.
    const getStates = async () => request.get(`${PREFIX}/bookStates/all`);

    // Book Services
    const getProducts = async ({ page, limit }) => request.get(`${PREFIX}?limit=${limit}&page=${page}`);

    const getProduct = async (id) => request.get(`${PREFIX}/` + id);

    const createProduct = async (data) => request.post(`${PREFIX}`, data);

    const editProduct = async (id, data) => request.put(`${PREFIX}/` + id, data);

    const deleteProduct = async (id) => request.remove(`${PREFIX}/` + id);

    // Search book
    const searchBook = async ({ content, page, limit }) => request.get(`/search/books?search=${content}&limit=${limit}&page=${page}`)


    // BookState Services
    const getAllBooksByState = async ({ page, limit, type }) => request.get(`${PREFIX}/booksState/${type}?limit=${limit}&page=${page}`);

    const getBookState = async (id) => request.get(`${PREFIX}/bookState/` + id);

    const addBookToLibrary = async (data) => request.post(`${PREFIX}/state`, data);

    return {
        getStates,
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