import api from './_api';

import { useLocalStorage } from '../hooks';

import {
    IAddingBookInLibraryRequest,
    IAddingBookInLibraryResponse,
    ICreateProductRequest,
    ICreateProductResponse,
    IEditProductRequest,
    IEditProductResponse,
    IGetAllProductByStateRequest,
    IGetAllProductByStateResponse,
    IGetBookStateResponse,
    IGetProductResponse,
    IGetProductsRequest,
    IGetProductsResponse,
    IGetStatesResponse,
    ISearchProductByEmailRequest,
    ISearchProductByEmailResponse,
    ISendFileRequest,
    ISendFileResponse,
} from '~/Types/services/BookService';

const PREFIX = '/book'
const SEARCH = '/search';

const _BookServiceFactory = () => {
    const [token] = useLocalStorage('@Book_TokenData', {});
    const request = api(token.accessToken);

    // Get book States ( id, title, symbol ) / For Reading, Reading and e.t.n.
    const getStates = async (): Promise<IGetStatesResponse[]> => request.get(`${PREFIX}/bookStates/all`);

    // Book Services
    const getProducts = async (data: IGetProductsRequest): Promise<IGetProductsResponse> => request.get(`${PREFIX}?limit=${data?.limit}&page=${data?.page}&search=${data?.searchContent}`);

    const getProduct = async (id: string): Promise<IGetProductResponse> => request.get(`${PREFIX}/` + id);

    const createProduct = async (data: ICreateProductRequest): Promise<ICreateProductResponse> => request.post(`${PREFIX}`, data);

    const sendFile = async (data: ISendFileRequest): Promise<ISendFileResponse> => request.post(`${PREFIX}/addImage`, data, true);

    const editProduct = async (id: string, data: IEditProductRequest): Promise<IEditProductResponse> => request.put(`${PREFIX}/` + id, data);

    const deleteProduct = async (id: string) => request.remove(`${PREFIX}/` + id);

    const searchBookByEmailOnUser = async ({ content, page, limit }: ISearchProductByEmailRequest): Promise<ISearchProductByEmailResponse> => request.get(`${SEARCH}/email?email=${content}`);
    // const searchBookByEmailOnUser = async ({ content, page, limit }) => request.get(`/search/email?email=${content}&limit=${limit}&page=${page}`);

    // BookState Services
    const getAllBooksByState = async (data: IGetAllProductByStateRequest): Promise<IGetAllProductByStateResponse> => request.get(`${PREFIX}/booksState/${data?.type}?limit=${data?.limit}&page=${data?.page}&search=${data?.searchContent}`);

    const getBookState = async (id: string): Promise<IGetBookStateResponse[]> => request.get(`${PREFIX}/bookState/` + id);

    const addBookToLibrary = async (data: IAddingBookInLibraryRequest): Promise<IAddingBookInLibraryResponse> => request.post(`${PREFIX}/state`, data);

    return {
        addBookToLibrary,
        createProduct,
        deleteProduct,
        editProduct,
        getAllBooksByState,
        getBookState,
        getProduct,
        getProducts,
        getStates,
        searchBookByEmailOnUser,
        sendFile,
    }
}

export default _BookServiceFactory;