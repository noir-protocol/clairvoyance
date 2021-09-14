import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const outer = {
  borderRightColor: '#e0e0e0 !important',
  padding: '0px 8px 0px 8px',
};

const outer0 = {
  ...outer,
  borderRight: {
    xs: 0,
    sm: 1,
  },
};

const outer1 = {
  ...outer,
  borderRight: {
    md: 1,
  },
};

const inner = {
  display: 'flex',
  alignItems: 'start',
  padding: 1,
};

const label = {
  fontSize: '0.8rem',
  color: 'rgb(135, 150, 170)',
};

const text = {
  fontSize: '1rem',
};

export default function Overview() {
  return (
    <Card>
      <Grid container sx={{padding: '8px 0px 8px 0px'}}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Box sx={outer0}>
            <Box sx={{...inner, flexDirection: 'column'}}>
              <Typography variant='h6' sx={label}>
                ETHER PRICE
              </Typography>
              <Typography variant='h6' sx={text}>
                $3,216.30 @ 0.07237 BTC
              </Typography>
            </Box>
            <Divider />
            <Box sx={{...inner, flexDirection: 'column'}}>
              <Typography variant='h6' sx={label}>
                MARKET CAP
              </Typography>
              <Typography variant='h6' sx={text}>
                $ 377,808,831,449.00
              </Typography>
            </Box>
            <Divider sx={{display:{xs:'block', sm:'none'}}} />
          </Box>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Box sx={outer1}>
            <Box sx={{...inner, flexDirection: 'column'}}>
              <Typography variant='h6' sx={label}>
                TRANSACTIONS
              </Typography>
              <Typography variant='h6' sx={text}>
                1,281.53 M
              </Typography>
            </Box>
            <Divider />
            <Box sx={{...inner, flexDirection: 'column'}}>
              <Typography variant='h6' sx={label}>
                DIFFICULTY
              </Typography>
              <Typography variant='h6' sx={text}>
                9,050.48 TH
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Box sx={outer}>
            <Divider sx={{display:{sm:'block', md:'none'}, paddingTop: {xs:0, sm:1}}} />
            <Box sx={{...inner, flexDirection: 'column'}}>
              <Typography variant='h6' sx={label}>
                ETHEREUM TRANSACTION HISTORY IN 14 DAYS
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}