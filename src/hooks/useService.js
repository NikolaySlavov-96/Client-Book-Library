//auth context

import { useAuthContext } from "../contexts/AuthContext";


export const useService = (serviceFactory) => {
    const { accessToken } = useAuthContext();

    const service = serviceFactory(accessToken);
    return service;
}