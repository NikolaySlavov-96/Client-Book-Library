import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAuthContext } from '../../../../contexts/AuthContext';

// import style from './Login.module.css';


const _VerifyAccount = () => {

    const { verifyToken } = useParams();
    const { verifyAccountWithToken } = useAuthContext();

    useEffect(() => {
        verifyAccountWithToken(verifyToken);
    }, []);


    return (<></>);
}

export default memo(_VerifyAccount);