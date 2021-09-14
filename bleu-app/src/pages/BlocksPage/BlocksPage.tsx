import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BlockList from './components/BlockList';

const root = {
  bgcolor: '#f5f5f5',
  display: 'flex',
  justifyContent: 'center',
  width: '100vw',
  height: '100%',
};

const main = {
  width: '100%',
  maxWidth: '1400px',
  padding: 2,
};

function BlocksPage() {
  return (
    <Box sx={root}>
      <Box sx={main}>
        <BlockList />
      </Box>
    </Box>
  );
}

export default BlocksPage;
