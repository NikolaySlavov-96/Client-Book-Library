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
    IMagicLinkRequest,
    IMagicLinkResponse,
    IVerifyMagicResponse,
    IProfile,
    IUpdateProfileRequest,
} from '~/Types/services/AuthService';

const PREFIX = '/auth';
// Profile is a separate resource from identity/auth (its own backend router),
// so it can move independently when auth migrates to a provider.
const PROFILE_PREFIX = '/profile';

const _AuthServiceFactory = () => {
    const register = async (data: IRegisterRequest): Promise<IRegisterResponse> => api.post(`${PREFIX}/register`, { inputData: data });

    const login = async (data: ILoginRequest): Promise<ILoginResponse> => api.post(`${PREFIX}/login`, { inputData: data });

    const logout = async (data: ILogOutRequest): Promise<ILogOutResponse> => api.post(`${PREFIX}/logout`, { inputData: data });

    const checkField = async () => api.get(`${PREFIX}/check`);

    const verifyToken = async (verifyToken: IVerifyTokeRequest): Promise<IVerifyTokenResponse> => api.post(`${PREFIX}/verify`, { inputData: { verifyToken } });

    const requestMagicLink = async (data: IMagicLinkRequest): Promise<IMagicLinkResponse> => api.post(`${PREFIX}/magic-link`, { inputData: data });

    const verifyMagicLink = async (token: string): Promise<IVerifyMagicResponse> => api.post(`${PREFIX}/magic-link/verify`, { inputData: { token } });

    const getProfile = async (): Promise<IProfile> => api.get(`${PROFILE_PREFIX}`);

    const updateProfile = async (data: IUpdateProfileRequest): Promise<IProfile> => api.patch(`${PROFILE_PREFIX}`, { inputData: data });

    return {
        register,
        login,
        logout,
        checkField,
        verifyToken,
        requestMagicLink,
        verifyMagicLink,
        getProfile,
        updateProfile,
    }
}

export default _AuthServiceFactory;