import './App.css';

import { AuthProvide } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';

import { Footer, Header } from './component/molecules';
import { Helmet } from './component/Screens';

import { Navigator } from './Utils';


const App = () => {
    return (
        <>
            <Helmet />
            <AuthProvide>
                <Header />
                <BookProvider>
                    <Navigator />
                </BookProvider>
            </AuthProvide>
            <Footer />
        </>
    );
}

export default App;