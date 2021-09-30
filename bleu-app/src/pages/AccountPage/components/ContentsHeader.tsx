import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const root: Readonly<any> = {
  display: 'flex',
  flexDirection: 'row',
  color: 'black',
  height: '50px',
};

export default function ContentsHeader() {
  return (
    <Box sx={root}>
      <Typography variant='h6'>Address</Typography><Typography variant='h6' style={{marginLeft: '5px', fontWeight: 'normal', fontSize: '0.9rem', lineHeight: '36px'}}>0x209F7e60C811271a3960C16d3a24fF005ADAADF5</Typography>
    </Box>
  );
}