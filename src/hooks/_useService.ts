import { useAuthContext } from "../contexts/AuthContext";

const _useService = (serviceFactory: Function) => {
    const { accessToken } = useAuthContext();

    const service = serviceFactory(accessToken);
    return service;
}

export default _useService;