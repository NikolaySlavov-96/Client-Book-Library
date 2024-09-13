import { createContext, useContext, } from "react";

import { useLocalStorage } from "../hooks";

import { AuthService } from "../services";

import { ServerError } from '../Constants';

const STORAGE_PREFIX = '@Book_';
const STORAGE_KEYS = {
    TOKEN_DATE: `${STORAGE_PREFIX}TokenData`,
    USER_DATA: `${STORAGE_PREFIX}UserData`
}

const AuthContext = createContext();

export const AuthProvide = ({ children }) => {
    const [tokenData, setTokenData] = useLocalStorage(STORAGE_KEYS.TOKEN_DATE, {});
    const [userData, setUserData] = useLocalStorage(STORAGE_KEYS.USER_DATA, {});

    const authService = AuthService(tokenData.accessToken);

    const onSubmitRegister = async (value) => {
        try {
            const data = await authService.register(value);
            return data;
        } catch (err) {
            alert(err.message);
        }
    }

    const onSubmitLogin = async (value) => {
        try {
            const data = await authService.login(value);

            if (data.messageCode === ServerError.SUCCESSFULLY_LOGIN.messageCode) {
                const newValue = value;
                newValue.currentDate = new Date();
                setUserData(newValue);
                setTokenData(data.userInfo);
            }

            return data;
        } catch (err) {
            alert(err.message);
        }
    }

    const onSubmitLogout = async () => {
        try {
            await authService.logout();
            setTokenData({});
            setUserData({});
        } catch (err) {

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

    const verifyAccountWithToken = async (token) => {
        try {
            const response = await authService.verifyToken(token);
            if (response.messageCode !== ServerError.SUCCESSFULLY_VERIFY_ACCOUNT.messageCode) {
                alert(response.message);
                return;
            }
            // navigate(ROUT_NAMES.LOGIN)
        } catch (err) {
            alert(err.message);
        }
    }

    const contextValue = {
        onSubmitRegister,
        onSubmitLogin,
        onSubmitLogout,
        isAuthenticated: !!tokenData.accessToken,
        email: tokenData.email,
        accessToken: tokenData.accessToken,
        userId: tokenData.id,
        verifyAccountWithToken,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}

