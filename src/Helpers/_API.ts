import { HOST } from "../constants";

import useStoreZ from "../hooks/_useStoreZ";

export type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

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

    // Read the token from the active auth store (zustand). The login flow persists
    // it here; the legacy STORAGE_KEYS.TOKEN_DATE key is no longer written.
    const accessToken = useStoreZ.getState().token;
    if (accessToken) {
        options.headers = {
            ...options.headers,
            'authorization': accessToken,
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