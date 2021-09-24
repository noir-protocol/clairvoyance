import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import GitHub from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';
import * as colors from '../colors';

const root: Readonly<any> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  bgcolor: 'rgb(37, 44, 52)',
  color: 'white',
  width: '100%',
  height: '300px',
};

const main = {
  width: '100%',
  maxWidth: '1400px',
  padding: '30px 0px 30px 0px',
};

const body = {
  padding: '0px 15px 0px 15px',
};

const divider = {
  bgcolor: 'white',
  margin: '24px 0px 16px 0px',
};

const copyright = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
};

const buttonBg = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  width: '28px',
  height: '28px',
  bgcolor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  '&:hover, &:active': {
    bgcolor: 'rgba(255, 255, 255, 0.9)',
    color: colors.primary,
  },
};

const button = {
  width: '14px',
  height: '14px',
};

export default function Footer() {
  return (
    <Box sx={root}>
      <Box sx={main}>
        <Box sx={body}>
          <Box>
            Powered by Turnpike<br />
            BLEU is a set of tools to build a blockchain explorer for any protocols.
          </Box>
          <Divider variant='middle' light={true} sx={divider} />
          <Box sx={copyright}>
            <Box>
              BLEU &copy; 2021 Turnpike
            </Box>
            <Box>
              <a href='https://github.com/turnpike/bleu' target='_blank'>
                <Box sx={buttonBg}>
                  <GitHub sx={button} />
                </Box>
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};