import React from 'react';
import Box from '@mui/material/Box';
import TransactionDetails from './components/TransactionDetails';
import ContentsHeader from './components/ContentsHeader';

const root: Readonly<any> = {
  bgcolor: '#f5f5f5',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
};

const main = {
  width: '100%',
  maxWidth: '1400px',
  padding: 2,
};

function TransactionDetailsPage() {
  return (
    <Box sx={root}>
      <Box sx={main}>
        <ContentsHeader />
        <TransactionDetails />
      </Box>
    </Box>
  );
}

export default TransactionDetailsPage;