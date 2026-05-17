export interface IRegisterRequest {
    email: string;
    password: string;
    year: string;
}

export interface IRegisterResponse {
    userInfo: Record<string, unknown>;
    message: string;
    messageCode: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
    connectId?: string;
}

export interface IAuthUserInfo {
    _id: number;
    id: number;
    email: string;
    year: number;
    isVerify: boolean;
    accessToken: string;
    role: 'user' | 'support';
}

export interface ILoginResponse {
    userInfo: IAuthUserInfo;
    message: string;
    messageCode: string;
}

export interface ILogOutRequest {
    connectId: string;
    token: string;
}

export interface ILogOutResponse { }

export interface IVerifyTokeRequest {
    token: string;
}

export interface IVerifyTokenResponse {
    userInfo: Record<string, unknown>;
    message: string;
    messageCode: string;
}
