export interface IRegisterRequest {
    email: string;
    password: string;
    year: string;
}

export interface IRegisterResponse {
    userInfo: {};
    message: string;
    messageCode: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    userInfo: {
        _id: number;
        email: string;
        year: number;
        isVerify: boolean;
        accessToken: string
        unId: string;
    };
    message: string;
    messageCode: string;
}

export interface ILogOutRequest {
    token: string;
}

export interface ILogOutResponse { }

interface ICheckFieldRequest { }

interface ICheckFieldResponse { }

export interface IVerifyTokeRequest {
    token: string;
}

export interface IVerifyTokenResponse {
    userInfo: {};
    message: string;
    messageCode: string;
}