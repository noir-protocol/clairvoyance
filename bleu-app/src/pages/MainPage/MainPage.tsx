import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LatestBlocks from './components/LatestBlocks';
import LatestTransactions from './components/LatestTransactions';
import Overview from './components/Overview';

import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';

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
  padding: '0px 15px 100px 15px',
};

const placeholder = {
  display: 'flex',
  alignItems: 'center',
  height: '218px',
};

const searchBar = {
};

const band: Readonly<any> = {
  bgcolor: 'rgb(37, 44, 52)',
  height: '268px',
  width: '100vw',
  zIndex: 0,
  position: 'absolute',
};

function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500, marginLeft: '15px' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search ..."
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

function MainPage() {
  return (
    <Box sx={root}>
      <Box sx={band} />
      <Box sx={main}>
        <Box sx={placeholder}>
          <CustomizedInputBase />
        </Box>
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
    </Box>
  );
}

export default MainPage;
