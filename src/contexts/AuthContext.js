import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authServiceFactory } from "../services/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";



const AuthContext = createContext();

export const AuthProvide = ({ children }) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();
    const authService = authServiceFactory(auth.accessToken);

    const onSubmitRegister = async (value) => {
        const { rePassword, ...othDate } = value;

        if (rePassword !== othDate.password) {
            return 'Password don\'t match';
        }

        try {
            const data = await authService.register(value);
            setAuth(data);
            navigate('/product/catalog');

        } catch (err) {
            console.log(err.message);
        }
    }

    const onSubmitLogin = async (value) => {
        try {
            const data = await authService.login(value);
            setAuth(data);
            navigate('/product/catalog');

        } catch (err) {
            console.log(err.message)
        }
    }

    const onSubmitLogout = async () => {
        await authService.logout();
        setAuth({});
        navigate('/')
    }

    const contextValue = {
        onSubmitRegister,
        onSubmitLogin,
        onSubmitLogout,
        isAuthenticated: !!auth.accessToken,
        username: auth.username,
        accessToken: auth.accessToken,
        userId: auth._id,
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

