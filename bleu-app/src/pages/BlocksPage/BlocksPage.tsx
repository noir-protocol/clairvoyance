import React from 'react';
import Box from '@mui/material/Box';
import BlockList from './components/BlockList';
import ContentsHeader from './components/ContentsHeader';
import Header from './components/Header';

const root: Readonly<any> = {
  bgcolor: '#f5f5f5',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
};

const header = {
  width: '100%',
  height: '100px',
};

const main = {
  width: '100%',
  maxWidth: '1400px',
  padding: 2,
};

function BlocksPage() {
  return (
    <Box sx={root}>
      <Box sx={header}>
        <Header />
      </Box>
      <Box sx={main}>
        <ContentsHeader />
        <BlockList />
      </Box>
    </Box>
  );
}

export default BlocksPage;
