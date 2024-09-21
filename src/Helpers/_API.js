import { HOST } from '../Constants/connectionData';

const _API = async (method, token, url, inputDate) => {
    const options = {
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