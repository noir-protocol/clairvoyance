import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import MainPage from './pages/MainPage';
import BlocksPage from './pages/BlocksPage/BlocksPage';
import './App.css';
import './i18n';

function App() {
  return (
    <RecoilRoot>
      <div className='App'>
        <Router>
          <Switch>
            <Route path='/blocks'>
              <BlocksPage />
            </Route>
            <Route path='/'>
              <MainPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </RecoilRoot>
  );
}

export default App;
