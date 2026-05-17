import './App.css';

import { Footer } from './component/molecules';
import { Helmet } from './component/Screens';

import { Navigator } from './Utils';

const App = () => (
  <>
    <Helmet />
    <Navigator />
    <Footer />
  </>
);

export default App;
