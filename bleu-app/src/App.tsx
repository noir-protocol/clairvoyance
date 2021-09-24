import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import Box from '@mui/material/Box';
import MainPage from './pages/MainPage';
import BlocksPage from './pages/BlocksPage/BlocksPage';
import './App.css';
import './i18n';
import Footer from './components/Footer';

const root: Readonly<any> = {
  bgcolor: '#f5f5f5',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

function App() {
  return (
    <RecoilRoot>
      <Box sx={root}>
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
        <Footer />
      </Box>
    </RecoilRoot>
  );
}

export default App;
