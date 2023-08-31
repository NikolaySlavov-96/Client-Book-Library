import { requesterFactory } from './requester';

export const bookServiceFactory = (token) => {
    const request = requesterFactory(token);

    const getProducts = async () => request.get('/book/books');

    const getProduct = async (id) => request.get('/book/book/' + id);

    const createProduct = async (data) => request.post('/book/book', data);

    const editProduct = async (id, data) => request.put('/book/book/' + id, data);

    const deleteProduct = async (id) => request.remove('/book/book/' + id);

    return {
        getProducts,
        getProduct,
        createProduct,
        editProduct,
        deleteProduct,
    }
}