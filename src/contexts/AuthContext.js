import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "../hooks/useLocalStorage";

import { AuthService } from "../services";


const AuthContext = createContext();

export const AuthProvide = ({ children }) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();

    const authService = AuthService(auth.accessToken);
    
    const [error, setError] = useState([]);

    const onSubmitRegister = async (value) => {
        const { rePassword, ...othDate } = value;

        if (rePassword !== othDate.password) {
            return 'Password don\'t match';
        }

        try {
            const data = await authService.register(value);
            setAuth(data);
            navigate('/');

        } catch (err) {
            setError(err.message);
        }
    }

    const onSubmitLogin = async (value) => {
        try {
            const data = await authService.login(value);

            // After Login from Response get message and visualize on user for better UI
            console.log("🚀 ~ onSubmitLogin ~ data:", data.message)
            setAuth(data.userInfo);
            navigate('/');

        } catch (err) {
            setError(err.message);
        }
    }

    const onSubmitLogout = async () => {
        await authService.logout();
        setAuth({});
        navigate('/')
    }

    const verifyAccoountWithToken = async (token) => {
        try {
            const res = await authService.verifyToken(token);
            navigate('/auth/login')
        } catch (err) {
            navigate('/auth')
        }
    }

    const contextValue = {
        onSubmitRegister,
        onSubmitLogin,
        onSubmitLogout,
        isAuthenticated: !!auth.accessToken,
        email: auth.email,
        accessToken: auth.accessToken,
        userId: auth.id,
        error,
        verifyAccoountWithToken,
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

