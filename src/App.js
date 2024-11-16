import './App.css';

import { AuthProvide } from './contexts/AuthContext';

import { Footer, Header } from './component/molecules';
import { Helmet } from './component/Screens';

import { Navigator } from './Utils';


const App = () => {
    return (
        <>
            <Helmet />
            <AuthProvide>
                <Header />
                <Navigator />
            </AuthProvide>
            <Footer />
        </>
    );
}

export default App;