import { Route, Routes } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext';

import { CustomerSupportChat, ModalContainer, UserQueueForSupportModule } from '../component/organisms';
import {
    Books,
    CreateBook,
    DetailsForBook,
    Login,
    NotFound,
    Register,
    SearchByEmail,
    UserCollection,
    VerifyAccount,
} from '../component/Screens';

import { ROUT_NAMES } from '../Constants';

const _Navigator = () => {
    const { userRole } = useAuthContext();
    return (
        <>
            <Routes>
                <Route path={ROUT_NAMES.HOME} element={<Books />} />
                <Route path={ROUT_NAMES.BOOK} element={<Books />} />
                {/* Route Defense */}
                <Route path={ROUT_NAMES.REVIEW_BOOKS_BY_EMAIL} element={<SearchByEmail />} />
                <Route path={ROUT_NAMES.CREATE_BOOK} element={<CreateBook />} />
                <Route path={ROUT_NAMES.BOOK_DETAILS} element={<DetailsForBook />} />
                <Route path={ROUT_NAMES.USER_COLLECTION} element={<UserCollection />} />
                <Route path={ROUT_NAMES.LOGIN} element={<Login />} />
                <Route path={ROUT_NAMES.REGISTER} element={<Register />} />
                <Route path={ROUT_NAMES.VERIFY_TOKEN} element={<VerifyAccount />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ModalContainer />
            {userRole === 'support' ? <UserQueueForSupportModule /> :
                <CustomerSupportChat />
            }
        </>
    )
};

export default _Navigator;