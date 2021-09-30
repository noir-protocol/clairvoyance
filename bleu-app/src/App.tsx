import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import Box from '@mui/material/Box';
import MainPage from './pages/MainPage';
import AccountPage from './pages/AccountPage';
import BlocksPage from './pages/BlocksPage';
import TransactionDetailsPage from './pages/TransactionDetailsPage';
import './App.css';
import './i18n';
import Header from './components/Header';
import Footer from './components/Footer';

const root: Readonly<any> = {
  bgcolor: '#f5f5f5',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const main: Readonly<any> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

function App() {
  return (
    <RecoilRoot>
      <Box sx={root}>
        <Box sx={main}>
          <Header />
          <Router>
            <Switch>
              <Route path='/txs'>
                <TransactionDetailsPage />
              </Route>
              <Route path='/blocks'>
                <BlocksPage />
              </Route>
              <Route path='/account'>
                <AccountPage />
              </Route>
              <Route path='/'>
                <MainPage />
              </Route>
            </Switch>
          </Router>
        </Box>
        <Footer />
      </Box>
    </RecoilRoot>
  );
}

export default App;
