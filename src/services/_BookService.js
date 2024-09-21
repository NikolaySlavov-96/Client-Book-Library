import api from './_api';

const PREFIX = '/book'
const SEARCH = '/search';

const _BookServiceFactory = (token) => {
    const request = api(token);

    // Get book States ( id, title, symbol ) / For Reading, Reading and e.t.n.
    const getStates = async () => request.get(`${PREFIX}/bookStates/all`);

    // Book Services
    const getProducts = async (data) => request.get(`${PREFIX}?limit=${data?.limit}&page=${data?.page}&search=${data?.searchContent}`);

    const getProduct = async (id) => request.get(`${PREFIX}/` + id);

    const createProduct = async (data) => request.post(`${PREFIX}`, data);

    const editProduct = async (id, data) => request.put(`${PREFIX}/` + id, data);

    const deleteProduct = async (id) => request.remove(`${PREFIX}/` + id);

    // Search book
    const searchBook = async ({ content, page, limit }) => request.get(`${SEARCH}/books?search=${content}&limit=${limit}&page=${page}`);

    const searchBookByEmailOnUser = async ({ content, page, limit }) => request.get(`${SEARCH}/email?email=${content}`);
    // const searchBookByEmailOnUser = async ({ content, page, limit }) => request.get(`/search/email?email=${content}&limit=${limit}&page=${page}`);

    // BookState Services
    const getAllBooksByState = async (data) => request.get(`${PREFIX}/booksState/${data?.type}?limit=${data?.limit}&page=${data?.page}&search=${data?.searchContent}`);

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
        searchBookByEmailOnUser,
    }
}

export default _BookServiceFactory;