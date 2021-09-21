import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const root: Readonly<any> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  //bgcolor: 'red',
  color: 'black',
  height: '50px',
};

export default function ContentsHeader() {
  return (
    <Box sx={root}>
      <Typography variant='h6'>Blocks</Typography>
    </Box>
  );
}