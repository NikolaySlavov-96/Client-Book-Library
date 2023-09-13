import { Route, Routes } from 'react-router-dom';
import './App.css';

import { AuthProvide } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import { Home } from './component/Home/Home';
import { Book } from './component/Book/Book';
import { Detail } from './component/Book/Detail/Detail';


function App() {
    return (
        <AuthProvide>
            <BookProvider>
                <Routes>
                    {/* <Route path='/' element={<Home />} /> */}
                    <Route path='/' element={<Book />} />
                    {/* <Route path='/book' element={<Book />} /> */}
                    <Route path='/book/:id' element={<Detail />} />
                </Routes>
            </BookProvider>
        </AuthProvide>
    );
}

export default App;
