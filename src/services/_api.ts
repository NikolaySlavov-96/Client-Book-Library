import { API } from "../Helpers";

const _api = (token: string) => {
    return {
        get: API.bind(null, 'GET', token),
        post: API.bind(null, 'POST', token),
        put: API.bind(null, 'PUT', token),
        remove: API.bind(null, 'DELETE', token),
    }
}

export default _api;