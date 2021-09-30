import React from 'react';
import Box from '@mui/material/Box';
import Account from './components/Account';
import ContentsHeader from './components/ContentsHeader';

const root: Readonly<any> = {
  bgcolor: '#f5f5f5',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  paddingTop: '15px',
};

const main = {
  width: '100%',
  maxWidth: '1400px',
};

const body = {
  padding: '0px 15px 0px 15px',
};

function AccountPage() {
  return (
    <Box sx={root}>
      <Box sx={main}>
        <Box sx={body}>
          <ContentsHeader />
          <Account />
        </Box>
      </Box>
    </Box>
  );
}

export default AccountPage;