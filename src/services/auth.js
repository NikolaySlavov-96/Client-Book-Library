import { requesterFactory } from './requester';

export const authServiceFactory = (token) => {
    const request = requesterFactory(token);

    const register = async (data) => request.post('/auth/register', data);

    const login = async (data) => request.post('/auth/login', data);

    const logout = async (data) => request.post('/auth/logout', data);

    const checkField = async () => request.get('/auth/check');

    const verifyToken = async (token) => request.post('/auth/verify', { verifyToken: token });

    return {
        register,
        login,
        logout,
        checkField,
        verifyToken,
    }
}