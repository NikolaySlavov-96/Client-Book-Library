import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

// import style from './Login.module.css';


export const VerifyAccount = () => {

    const { verifyToken } = useParams();
    const { verifyAccoountWithToken } = useAuthContext();

    useEffect(() => {
        verifyAccoountWithToken(verifyToken);
    }, []);


    return (<></>);
}