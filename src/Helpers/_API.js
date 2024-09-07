import { HOST } from '../Constants/connectionData';

async function requester(method, token, url, inputDate) {
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

const requesterFactory = (token) => {
    return {
        get: requester.bind(null, 'GET', token),
        post: requester.bind(null, 'POST', token),
        put: requester.bind(null, 'PUT', token),
        remove: requester.bind(null, 'DELETE', token),
    }
}

export default requesterFactory;