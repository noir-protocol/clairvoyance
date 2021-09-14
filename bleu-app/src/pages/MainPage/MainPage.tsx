import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import LatestBlocks from './components/LatestBlocks';
import LatestTransactions from './components/LatestTransactions';
import MenuIcon from '@mui/icons-material/Menu';
import Overview from './components/Overview';
import Typography from '@mui/material/Typography';

const root = {
  bgcolor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
};

const main = {
  width: '100vw',
  maxWidth: 1400,
  zIndex: 10,
};

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '55px',
  color: '#333',
  paddingLeft: '8px',
};

const menu = {
  color: '#333',
};

const body = {
  padding: '0px 8px 0px 8px',
};

const placeholder = {
  height: '218px',
};

const band = {
  bgcolor: 'rgb(37, 44, 52)',
  height: '268px',
  width: '100vw',
  marginTop: header.height,
  zIndex: 0,
};

function MainPage() {
  return (
    <Box sx={{...root, flexDirection: 'column'}}>
      <Box sx={main}>
        <Box sx={header}>
          <Typography variant='h5'>
            BLEU
          </Typography>
          <Box sx={{display:{xs:'none',sm:'none',md:'block'}}}>
            <Button sx={menu}>Home</Button>
            <Button sx={menu} href='/blocks'>Blockchain</Button> <Button sx={menu}>Tokens</Button>
            <Button sx={menu}>Resources</Button>
            <Button sx={menu}>Misc</Button>
          </Box>
          <IconButton edge='start' color='inherit' aria-label='menu' sx={{display:{sm:'block', md:'none'}}}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={placeholder}>
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
      <Box sx={{...band, position: 'absolute'}} />
    </Box>
  );
}

export default MainPage;
