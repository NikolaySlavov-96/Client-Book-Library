import { API } from '../Helpers';

const PREFIX = '/api/book'

export const bookServiceFactory = (token) => {
    const request = API(token);

    const getProducts = async ({ page, limit }) => request.get(`${PREFIX}?limit=${limit}&page=${page}`);

    const getProduct = async (id) => request.get(`${PREFIX}` + id);

    const createProduct = async (data) => request.post(`${PREFIX}`, data);

    const editProduct = async (id, data) => request.put(`${PREFIX}` + id, data);

    const deleteProduct = async (id) => request.remove(`${PREFIX}` + id);

    const searchBook = async (data, { page, limit }, type) => request.get(`/${type}/search?search=${data}&limit=${limit}&page=${page}`)

    const getUserBooks = async ({ page, limit }, type) => request.get(`/users/${type}?limit=${limit}&page=${page}`);

    const addinBookInLib = async (data, type) => request.post(`/users/${type}`, data);

    return {
        getProducts,
        getProduct,
        createProduct,
        editProduct,
        deleteProduct,
        searchBook,
        getUserBooks,
        addinBookInLib,
    }
}