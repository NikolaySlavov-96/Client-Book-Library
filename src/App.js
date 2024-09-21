import { Route, Routes } from 'react-router-dom';

import './App.css';

import { AuthProvide } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import { SocketProvider } from './contexts/SocketContext';

import { Footer, Header } from './component/molecules';
import { VerifyAccount, Register, Login, Books, CreateBook, DetailsForBook, SearchByEmail, UserCollection, Helmet } from './component/Screens';
import { ModalContainer } from './component/organisms';

import { ROUT_NAMES } from './Constants';


const App = () => {
    return (
        <>
            <Helmet />
            <AuthProvide>
                <Header />
                <BookProvider>
                    <SocketProvider>
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
                        </Routes>
                        <ModalContainer />
                    </SocketProvider>
                </BookProvider>
            </AuthProvide>
            <Footer />
        </>
    );
}

export default App;