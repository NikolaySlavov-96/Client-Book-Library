import { createContext, ReactNode, useContext, } from "react";

import { useLocalStorage, useStoreZ } from "../hooks";

import { AuthService } from "../services";

import { ServerError, STORAGE_KEYS } from '../Constants';

interface IAuthContext {
    onSubmitLogin: (data: any) => any;
    onSubmitLogout: (data: any) => void;
    onSubmitRegister: (data: any) => any;
    verifyAccountWithToken: (data: any) => void;
    email: string;
    isAuthenticated: boolean;
    isVerifyUser: boolean;
    userId: string;
    userRole: 'user' | 'support';
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvide = ({ children }: { children: ReactNode }) => {

    const { connectId } = useStoreZ();
    const [tokenData, setTokenData] = useLocalStorage(STORAGE_KEYS.TOKEN_DATE, {});
    const [userData, setUserData] = useLocalStorage(STORAGE_KEYS.USER_DATA, {});

    const authService = AuthService();

    const onSubmitRegister = async (value: any) => {
        try {
            const data = await authService.register(value);
            return data;
        } catch (err) {
            return err;
        }
    }

    const onSubmitLogin = async (value: any) => {
        try {
            const modifyData = { ...value, connectId: connectId }
            const data = await authService.login(modifyData);

            if (data.messageCode === ServerError.SUCCESSFULLY_LOGIN.messageCode) {
                const newValue = value;
                newValue.currentDate = new Date();
                setUserData(newValue);
                setTokenData(data.userInfo);
            }

            return data;
        } catch (err) {
            return err;
        }
    }

    const onSubmitLogout = async () => {
        try {
            await authService.logout({ token: '1' });
            setTokenData({});
            setUserData({});
            // Modal for success logout
        } catch (err) {
            return err;
        }
    }

    const autoLogOut = () => {
        if (userData.email) {
            const currentTime = new Date().getTime();
            const userDataDate = new Date(userData.currentDate).getTime();

            const differenceBetweenDate = currentTime - userDataDate;
            if (currentTime > userDataDate && differenceBetweenDate - 1800000 > 0) {
                onSubmitLogout()
            }
        }
    };
    autoLogOut()

    const verifyAccountWithToken = async (token: string) => {
        try {
            const response = await authService.verifyToken({ token });
            if (response.messageCode !== ServerError.SUCCESSFULLY_VERIFY_ACCOUNT.messageCode) {
                alert(response.message);
                return;
            }
            // navigate(ROUT_NAMES.LOGIN)
        } catch (err) {
            return err;
        }
    }

    const contextValue: IAuthContext = {
        onSubmitRegister,
        onSubmitLogin,
        onSubmitLogout,
        isVerifyUser: tokenData.isVerify,
        isAuthenticated: !!tokenData.accessToken,
        email: tokenData.email,
        userId: tokenData.id,
        userRole: tokenData.role,
        verifyAccountWithToken,
    }

    return (
        <AuthContext.Provider value={contextValue} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within a AuthContextProvider');
    }
    return context;
}

