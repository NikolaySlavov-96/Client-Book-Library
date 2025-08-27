import { HOST, STORAGE_KEYS } from "../constants";

import { getDataFromStorage } from "./_Storage";

export type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IOptions {
    method: TMethod;
    headers: any;
    body?: any;
}
interface IMoreData {
    inputData: object;
    isImage?: boolean;
}

const _API = async (method: TMethod, url: string, moreData?: IMoreData) => {
    const options: IOptions = {
        method,
        headers: {}
    }

    if (moreData?.inputData !== undefined && !moreData?.isImage) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(moreData?.inputData);
    }

    if (moreData?.isImage) {
        options.body = moreData?.inputData;
    }

    const token = getDataFromStorage(STORAGE_KEYS.TOKEN_DATE);
    if (token?.accessToken) {
        options.headers = {
            ...options.headers,
            'product-id': token.accessToken,
        }
    }

    try {
        const response = await fetch(HOST + url, options);

        if (response.status === 204) {
            return response;
        }

        const data = await response.json();
        if (!response.ok) {
            throw data;
        }

        return data;

    } catch (err) {
        throw err as Error;
    }
}

export default _API;