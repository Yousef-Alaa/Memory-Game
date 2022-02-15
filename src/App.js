import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './pages/home';
import Game from './pages/game';

import 'react-toastify/dist/ReactToastify.min.css';
import 'sweetalert2/src/sweetalert2.scss'
import './index.scss';

/* 
import './sweetalert.min.css';
*/

function App() {

  return (
    <BrowserRouter>
      <ToastContainer autoClose={2500} />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/game' component={Game} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
