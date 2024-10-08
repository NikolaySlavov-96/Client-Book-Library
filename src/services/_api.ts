import { API } from "../Helpers";

const _api = {
    get: API.bind(null, 'GET'),
    post: API.bind(null, 'POST'),
    put: API.bind(null, 'PUT'),
    remove: API.bind(null, 'DELETE'),
}


export default _api;