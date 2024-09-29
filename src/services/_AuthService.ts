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

const _AuthServiceFactory = (token: string) => {
    const request = api(token);

    const register = async (data: IRegisterRequest): Promise<IRegisterResponse> => request.post(`${PREFIX}/register`, data);

    const login = async (data: ILoginRequest): Promise<ILoginResponse> => request.post(`${PREFIX}/login`, data);

    const logout = async (data: ILogOutRequest): Promise<ILogOutResponse> => request.post(`${PREFIX}/logout`, data);

    const checkField = async () => request.get(`${PREFIX}/check`);

    const verifyToken = async (token: IVerifyTokeRequest): Promise<IVerifyTokenResponse> => request.post(`${PREFIX}/verify`, { verifyToken: token });

    return {
        register,
        login,
        logout,
        checkField,
        verifyToken,
    }
}

export default _AuthServiceFactory;