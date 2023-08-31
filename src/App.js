import { Route, Routes } from 'react-router-dom';
import './App.css';

import { AuthProvide } from './contexts/AuthContext';
import { Home } from './component/Home/Home';
import { Book } from './component/Book/Book';
import { BookProvider } from './contexts/BookContext';


function App() {
    return (
        <AuthProvide>
            <BookProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/book' element={<Book />} />
                </Routes>
            </BookProvider>
        </AuthProvide>
    );
}

export default App;
