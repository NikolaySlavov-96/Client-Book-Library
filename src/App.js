import { Route, Routes } from 'react-router-dom';
import './App.css';

import { HeadProvider } from './contexts/HeadContext';
import { AuthProvide } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';

import { Book } from './component/Book/Book';
import { Detail } from './component/Book/Detail/Detail';
import { UserCollectionBook } from './component/Book/UserCollectionBook/UserCollectionBook';
import { Create } from './component/Book/Create/Create';

import { Header, Helmet, Footer } from './component/UI';
import { VerifyAccount, Register, Login } from './component/Screens';


function App() {
    return (
        <HeadProvider>
            <Helmet />
            <AuthProvide>
                <Header />

                <BookProvider>
                    <Routes>
                        <Route path='/' element={<Book />} />
                        <Route path='/book' element={<Book />} />
                        <Route path='/create' element={<Create />} />
                        <Route path='/book/:id' element={<Detail />} />
                        <Route path='/collections' element={<UserCollectionBook />} />
                        <Route path='/auth/login' element={<Login />} />
                        <Route path='/auth/register' element={<Register />} />
                        <Route path='/auth/verify/:verifyToken' element={<VerifyAccount />} />
                    </Routes>
                </BookProvider>
            </AuthProvide>
            <Footer />
        </HeadProvider>
    );
}

export default App;
