import { HOST } from '../Constants/connectionData';

type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IOptions {
    method: TMethod;
    headers: any;
    body?: any;
}

const _API = async (method: TMethod, token: string, url: string, inputDate?: object) => {
    const options: IOptions = {
        method,
        headers: {}
    }

    if (inputDate !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(inputDate);
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