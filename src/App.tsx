
import './pages/css/App.css';
import Header from './components/Header';

import store from './store/store';
import { Provider } from 'react-redux';
import { Route, Router, Routes } from 'react-router-dom';
import Modal from './components/Modal';
import { createContext } from 'react';
import { Props } from './type/memberType';

export let Context = createContext({}); //Context == state 보관소

function App() {


  return (
    <div className="App">
      <Provider store={store}>
          <Header/>
    
       </Provider>

    </div>
  );
}

export default App;
