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

// Get book States ( id, title, symbol ) / For Reading, Reading and e.t.n.
export const getStates = async (): Promise<IGetStatesResponse[]> => api.get(`${PREFIX}/bookStates/all`);

// Book Services
export const getProducts = async (data: IGetProductsRequest): Promise<IGetProductsResponse> => api.get(`${PREFIX}?limit=${data?.limit}&page=${data?.page}&search=${data?.searchContent}`);

export const getProduct = async (id: string): Promise<IGetProductResponse> => api.get(`${PREFIX}/` + id);

export const createProduct = async (data: ICreateProductRequest): Promise<ICreateProductResponse> => api.post(`${PREFIX}`, { inputData: data });

export const sendFile = async (data: ISendFileRequest): Promise<ISendFileResponse> => api.post(`${PREFIX}/addImage`, { inputData: data, isImage: true });

export const editProduct = async (id: string, data: IEditProductRequest): Promise<IEditProductResponse> => api.put(`${PREFIX}/` + id, { inputData: data });

export const deleteProduct = async (id: string) => api.remove(`${PREFIX}/` + id);

export const searchBookByEmailOnUser = async ({ searchContent, page, limit }: ISearchProductByEmailRequest): Promise<ISearchProductByEmailResponse> => api.get(`${SEARCH}/email?email=${searchContent}`);
// export const searchBookByEmailOnUser = async ({ content, page, limit }) => api.get(`/search/email?email=${content}&limit=${limit}&page=${page}`);

// BookState Services
export const getAllBooksByState = async (data: IGetAllProductByStateRequest): Promise<IGetAllProductByStateResponse> => api.get(`${PREFIX}/booksState/${data?.type}?limit=${data?.limit}&page=${data?.page}&search=${data?.searchContent}`);

export const getBookState = async (id: string): Promise<IGetBookStateResponse> => api.get(`${PREFIX}/bookState/` + id);

export const addBookToLibrary = async (data: IAddingBookInLibraryRequest): Promise<IAddingBookInLibraryResponse> => api.post(`${PREFIX}/state`, { inputData: data });