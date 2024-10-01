import { HOST } from "../Constants/connectionData";

export type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IOptions {
    method: TMethod;
    headers: any;
    body?: any;
}

const _API = async (method: TMethod, token: string, url: string, inputDate?: object, isImage?: boolean) => {
    const options: IOptions = {
        method,
        headers: {
            'X-user-idp': '22',
        }
    }
    
    if (inputDate !== undefined && !isImage) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(inputDate);
    }
    
    if(isImage) {
        options.body = inputDate;
    }

    if (token) {
        options.headers = {
            ...options.headers,
            'book-id': token,
        }
    }

    try {
        const response = await fetch(HOST + url, options);

        if (response.status === 204) {
            return response;
        }

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (err) {
        throw err;
    }
}

export default _API;