import { Route, Routes } from 'react-router-dom';
import './App.css';

import { HeadProvider } from './contexts/HeadContext';
import { AuthProvide } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';

import { Header, Helmet, Footer } from './component/UI';
import { VerifyAccount, Register, Login, Books, CreateBook, DetailsForBook } from './component/Screens';
import ModalContainer from './component/Modals';

import ROUT_NAMES from './Constants/routNames';
import { SocketProvider } from './contexts/SocketContext';


const App = () => {
    return (
        <HeadProvider>
            <Helmet />
            <AuthProvide>
                <Header />

                <BookProvider>
                    <SocketProvider>
                        <Routes>
                            <Route path={ROUT_NAMES.HOME} element={<Books />} />
                            <Route path={ROUT_NAMES.BOOK} element={<Books />} />
                            <Route path={ROUT_NAMES.CREATE_BOOK} element={<CreateBook />} />
                            <Route path={ROUT_NAMES.BOOK_DETAILS} element={<DetailsForBook />} />
                            <Route path={ROUT_NAMES.USER_COLLECTION} element={<Books />} />
                            <Route path={ROUT_NAMES.LOGIN} element={<Login />} />
                            <Route path={ROUT_NAMES.REGISTER} element={<Register />} />
                            <Route path={ROUT_NAMES.VERIFY_TOKEN} element={<VerifyAccount />} />
                        </Routes>
                        <ModalContainer />
                    </SocketProvider>
                </BookProvider>
            </AuthProvide>
            <Footer />
        </HeadProvider>
    );
}

export default App;