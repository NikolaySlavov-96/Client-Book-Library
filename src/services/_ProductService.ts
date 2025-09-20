import api from './_api';

import {
    IAddingProductInLibraryRequest,
    IAddingProductInLibraryResponse,
    ICreateProductRequest,
    ICreateProductResponse,
    IEditProductRequest,
    IEditProductResponse,
    IGetAllProductByStateRequest,
    IGetAllProductByStateResponse,
    IGetStatusResponse,
    IGetProductResponse,
    IGetProductsRequest,
    IGetProductsResponse,
    IGetStatesResponse,
    ISearchProductByEmailRequest,
    ISearchProductByEmailResponse,
} from './ProductService.interface';

const PREFIX = '/product'
const SEARCH = '/search';

// Get product States ( id, title, symbol ) / For Reading, Reading and e.t.n.
export const getAllStatus = async (): Promise<IGetStatesResponse[]> => api.get(`${PREFIX}/status/all`);

// Product Services
export const getProducts = async (data: IGetProductsRequest): Promise<IGetProductsResponse> => api.get(`${PREFIX}?limit=${data?.limit}&page=${data?.page}&search=${data?.searchContent}`);

export const getProduct = async (id: string): Promise<IGetProductResponse> => api.get(`${PREFIX}/` + id);

export const createProduct = async (data: ICreateProductRequest): Promise<ICreateProductResponse> => api.post(`${PREFIX}`, { inputData: data });

export const editProduct = async (id: string, data: IEditProductRequest): Promise<IEditProductResponse> => api.put(`${PREFIX}/` + id, { inputData: data });

export const deleteProduct = async (id: string) => api.remove(`${PREFIX}/` + id);

export const searchProductByEmailOnUser = async ({ searchContent, page, limit }: ISearchProductByEmailRequest): Promise<ISearchProductByEmailResponse> => api.get(`${SEARCH}/email?email=${searchContent}`);
// export const searchProductByEmailOnUser = async ({ content, page, limit }) => api.get(`/search/email?email=${content}&limit=${limit}&page=${page}`);

// ProductState Services
export const getAllProductStatus = async (data: IGetAllProductByStateRequest): Promise<IGetAllProductByStateResponse> => api.get(`${PREFIX}/status/${data?.type}?limit=${data?.limit}&page=${data?.page}&search=${data?.searchContent}`);

export const getProductStatus = async (id: string): Promise<IGetStatusResponse> => api.get(`${PREFIX}/${id}/status`);

export const addStatusOnProduct = async (data: IAddingProductInLibraryRequest): Promise<IAddingProductInLibraryResponse> => api.post(`${PREFIX}/status`, { inputData: data });