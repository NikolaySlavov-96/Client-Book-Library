import api from './_api';

import {
    ILoginRequest,
    ILoginResponse,
    ILogOutRequest,
    ILogOutResponse,
    IRegisterRequest,
    IRegisterResponse,
    IVerifyTokenResponse,
    IVerifyTokeRequest,
} from '~/Types/services/AuthService';

const PREFIX = '/auth';

const _AuthServiceFactory = () => {
    const register = async (data: IRegisterRequest): Promise<IRegisterResponse> => api.post(`${PREFIX}/register`, { inputData: data });

    const login = async (data: ILoginRequest): Promise<ILoginResponse> => api.post(`${PREFIX}/login`, { inputData: data });

    const logout = async (data: ILogOutRequest): Promise<ILogOutResponse> => api.post(`${PREFIX}/logout`, { inputData: data });

    const checkField = async () => api.get(`${PREFIX}/check`);

    const verifyToken = async (verifyToken: IVerifyTokeRequest): Promise<IVerifyTokenResponse> => api.post(`${PREFIX}/verify`, { inputData: { verifyToken } });

    return {
        register,
        login,
        logout,
        checkField,
        verifyToken,
    }
}

export default _AuthServiceFactory;