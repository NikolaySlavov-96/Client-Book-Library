import { requesterFactory } from './requester';

export const bookServiceFactory = (token) => {
    const request = requesterFactory(token);

    const getProducts = async ({ page, limit }) => request.get(`/book/book?limit=${limit}&page=${page}`);

    const getProduct = async (id) => request.get('/book/book/' + id);

    const createProduct = async (data, type) => request.post(`/book/${type}`, data);

    const editProduct = async (id, data) => request.put('/book/book/' + id, data);

    const deleteProduct = async (id) => request.remove('/book/book/' + id);

    const searchBook = async (data, { page, limit }) => request.get(`/book/search?search=${data}&limit=${limit}&page=${page}`)

    // const getUserBooks = async (type, { page, limit }) => request.get(`/users/${type}?limit=${limit}&page=${page}`);
    const getUserBooks = async (type) => request.get(`/users/${type}`);

    return {
        getProducts,
        getProduct,
        createProduct,
        editProduct,
        deleteProduct,
        searchBook,
        getUserBooks,
    }
}