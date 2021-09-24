import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LatestBlocks from './components/LatestBlocks';
import LatestTransactions from './components/LatestTransactions';
import Overview from './components/Overview';

const root: Readonly<any> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
};

const main = {
  width: '100%',
  maxWidth: 1400,
  zIndex: 10,
};

const body = {
  padding: '0px 8px 100px 8px',
};

const placeholder = {
  height: '218px',
};

const band: Readonly<any> = {
  bgcolor: 'rgb(37, 44, 52)',
  height: '268px',
  width: '100vw',
  zIndex: 0,
  position: 'absolute',
};

function MainPage() {
  return (
    <Box sx={root}>
      <Box sx={main}>
        <Box sx={placeholder} />
        <Grid container spacing={2} sx={body}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Overview />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <LatestBlocks />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <LatestTransactions />
          </Grid>
        </Grid>
      </Box>
      <Box sx={band} />
    </Box>
  );
}

export default MainPage;
