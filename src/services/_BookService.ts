import api from './_api';

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
    // Get book States ( id, title, symbol ) / For Reading, Reading and e.t.n.
    const getStates = async (): Promise<IGetStatesResponse[]> => api.get(`${PREFIX}/bookStates/all`);

    // Book Services
    const getProducts = async (data: IGetProductsRequest): Promise<IGetProductsResponse> => api.get(`${PREFIX}?limit=${data?.limit}&page=${data?.page}&search=${data?.searchContent}`);

    const getProduct = async (id: string): Promise<IGetProductResponse> => api.get(`${PREFIX}/` + id);

    const createProduct = async (data: ICreateProductRequest): Promise<ICreateProductResponse> => api.post(`${PREFIX}`, { inputData: data });

    const sendFile = async (data: ISendFileRequest): Promise<ISendFileResponse> => api.post(`${PREFIX}/addImage`, { inputData: data, isImage: true });

    const editProduct = async (id: string, data: IEditProductRequest): Promise<IEditProductResponse> => api.put(`${PREFIX}/` + id, { inputData: data });

    const deleteProduct = async (id: string) => api.remove(`${PREFIX}/` + id);

    const searchBookByEmailOnUser = async ({ content, page, limit }: ISearchProductByEmailRequest): Promise<ISearchProductByEmailResponse> => api.get(`${SEARCH}/email?email=${content}`);
    // const searchBookByEmailOnUser = async ({ content, page, limit }) => api.get(`/search/email?email=${content}&limit=${limit}&page=${page}`);

    // BookState Services
    const getAllBooksByState = async (data: IGetAllProductByStateRequest): Promise<IGetAllProductByStateResponse> => api.get(`${PREFIX}/booksState/${data?.type}?limit=${data?.limit}&page=${data?.page}&search=${data?.searchContent}`);

    const getBookState = async (id: string): Promise<IGetBookStateResponse[]> => api.get(`${PREFIX}/bookState/` + id);

    const addBookToLibrary = async (data: IAddingBookInLibraryRequest): Promise<IAddingBookInLibraryResponse> => api.post(`${PREFIX}/state`, { inputData: data });

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