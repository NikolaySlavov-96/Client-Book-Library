import { api } from '.';

const PREFIX = '/auth';

const _AuthServiceFactory = (token) => {
    const request = api(token);

    const register = async (data) => request.post(`${PREFIX}/register`, data);

    const login = async (data) => request.post(`${PREFIX}/login`, data);

    const logout = async (data) => request.post(`${PREFIX}/logout`, data);

    const checkField = async () => request.get(`${PREFIX}/check`);

    const verifyToken = async (token) => request.post(`${PREFIX}/verify`, { verifyToken: token });

    return {
        register,
        login,
        logout,
        checkField,
        verifyToken,
    }
}

export default _AuthServiceFactory;