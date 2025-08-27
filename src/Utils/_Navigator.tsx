import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext';

import { CustomerSupportChat, ModalContainer } from '../component/organisms';
import {
    CreateProduct,
    DetailsForProduct,
    Login,
    NotFound,
    Products,
    Register,
    SearchByEmail,
    Support,
    UserCollection,
    VerifyAccount,
} from '../component/Screens';

import { ROUT_NAMES } from '../constants2';

import { useStoreZ } from '../hooks';

import { SocketHelper } from '../Helpers';

const _Navigator = () => {
    const { fetchAllProductStates } = useStoreZ();
    const { userRole } = useAuthContext();

    useEffect(() => {
        fetchAllProductStates();
    }, [fetchAllProductStates]);

    SocketHelper();

    return (
        <>
            <Routes>
                <Route path={ROUT_NAMES.HOME} element={<Products />} />
                <Route path={ROUT_NAMES.PRODUCT} element={<Products />} />
                {/* Route Defense */}
                <Route path={ROUT_NAMES.REVIEW_PRODUCTS_BY_EMAIL} element={<SearchByEmail />} />
                <Route path={ROUT_NAMES.CREATE_PRODUCT} element={<CreateProduct />} />
                <Route path={ROUT_NAMES.PRODUCT_DETAILS} element={<DetailsForProduct />} />
                <Route path={ROUT_NAMES.USER_COLLECTION} element={<UserCollection />} />
                <Route path={ROUT_NAMES.LOGIN} element={<Login />} />
                <Route path={ROUT_NAMES.REGISTER} element={<Register />} />
                <Route path={ROUT_NAMES.VERIFY_TOKEN} element={<VerifyAccount />} />
                {userRole === 'support' ?
                    <Route path={ROUT_NAMES.SUPPORT_CHAT} element={<Support />} /> : null
                }
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ModalContainer />
            {userRole !== 'support' ? <CustomerSupportChat /> : null}
        </>
    )
};

export default _Navigator;