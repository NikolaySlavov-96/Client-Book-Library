import { Route, Routes } from 'react-router-dom';
import './App.css';

import { AuthProvide } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import { Home } from './component/Home/Home';
import { Book } from './component/Book/Book';
import { Detail } from './component/Book/Detail/Detail';
import { Login } from './component/Auth/Login/Login';
import { Register } from './component/Auth/Register/Register';
import { Header } from './component/Header/Header';
import { UserCollectionBook } from './component/Book/UserCollectionBook/UserCollectionBook';
import { MetaData } from './component/Head/Helmet';
import { HeadProvider } from './contexts/HeadContext';
import { Create } from './component/Book/Create/Create';
import { Footer } from './component/Footer/Footer';
import { CollectionProvider } from './contexts/CollectionContext';


function App() {
    return (
        <HeadProvider>
            <MetaData />
            <AuthProvide>
                <Header />

                <BookProvider>
                    <CollectionProvider>
                        <Routes>
                            {/* <Route path='/' element={<Home />} /> */}
                            <Route path='/' element={<Book />} />
                            <Route path='/book' element={<Book />} />
                            <Route path='/create' element={<Create />} />
                            <Route path='/book/:id' element={<Detail />} />
                            {/* <Route path='/userbook/:id' element={<UserBook />} /> */}
                            <Route path='/collections' element={<UserCollectionBook />} />
                            <Route path='/auth/login' element={<Login />} />
                            <Route path='/auth/register' element={<Register />} />
                        </Routes>
                    </CollectionProvider>
                </BookProvider>
            </AuthProvide>
            <Footer />
        </HeadProvider>
    );
}

export default App;
