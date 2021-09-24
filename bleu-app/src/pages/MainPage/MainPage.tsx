import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LatestBlocks from './components/LatestBlocks';
import LatestTransactions from './components/LatestTransactions';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import Overview from './components/Overview';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const root: Readonly<any> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};

const main = {
  width: '100%',
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

const menuButton = {
  color: '#333',
  padding: '8px 16px 8px 16px',
};

const menuButtonText = {
  fontSize: '0.9rem',
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
  marginTop: header.height,
  zIndex: 0,
  position: 'absolute',
};

const menu = {
  padding: '12px 0px 16px 0px',
};

const menuItem = {
  display: 'flex',
  justifyContent: 'initial',
  alignItems: 'center',
  width: '154px',
  height: '19px',
  padding: '8px 28px 8px 28px',
  '&:hover': {
    bgcolor: 'rgba(0, 0, 0, 0.04)',
  },
};

const menuText = {
  color: '#333',
  fontSize: '0.875rem',
};

const dummy = (): Element | null => {
  return null;
};

function MainPage() {
  const [menuCtx, setMenuCtx] = React.useState({
    active: '',
    anchorEl: dummy(),
    onMenu: false,
  });
  const openBlockchainMenu = (event: any) => {
    setMenuCtx({
      ...menuCtx,
      active: 'blockchain',
      anchorEl: event.currentTarget,
    });
  };
  const openTokensMenu = (event: any) => {
    setMenuCtx({
      ...menuCtx,
      active: 'tokens',
      anchorEl: event.currentTarget,
    });
  };
  const closeMenu = () => {
    setMenuCtx({
      active: '',
      anchorEl: dummy(),
      onMenu: false,
    });
  };
  const outMenu = (event: any) => {
    if (menuCtx.active !== '' && !menuCtx.onMenu) {
      const coords = menuCtx.anchorEl?.getBoundingClientRect();
      if (coords) {
        if (event.clientX < coords.x || event.clientX >= (coords.x + coords.width) ||
            event.clientY < coords.y || event.clientY >= (coords.y + coords.height)) {
          closeMenu();
        }
      }
    }
  };
  const onMenu = () => {
    setMenuCtx({
      ...menuCtx,
      onMenu: true,
    });
  };

  return (
    <Box sx={root}>
      <Box sx={main}>
        <Box sx={header}>
          <Typography variant='h5'>
            BLEU
          </Typography>
          <Box sx={{display:{xs:'none',sm:'none',md:'flex'}}}>
            <Box sx={menuButton}><Typography sx={menuButtonText}>Home</Typography></Box>
            <Box sx={menuButton} onMouseOver={openBlockchainMenu}><Typography sx={menuButtonText}>Blockchain &#128317;</Typography></Box>
            <Popover open={menuCtx.active === 'blockchain'} anchorEl={menuCtx.anchorEl} onMouseMove={outMenu} onClose={closeMenu} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}>
              <Box sx={menu} onMouseEnter={onMenu} onMouseLeave={closeMenu}>
                <Link href='/blocks' underline='none'>
                  <Box sx={menuItem}>
                    <Typography sx={menuText}>Transactions</Typography>
                  </Box>
                </Link>
                <Link href='/blocks' underline='none'>
                  <Box sx={menuItem}>
                    <Typography sx={menuText}>Blocks</Typography>
                  </Box>
                </Link>
                <Link href='/blocks' underline='none'>
                  <Box sx={menuItem}>
                    <Typography sx={menuText}>Top Accounts</Typography>
                  </Box>
                </Link>
              </Box>
            </Popover>
            <Box sx={menuButton} onMouseOver={openTokensMenu}><Typography sx={menuButtonText}>Tokens &#128317;</Typography></Box>
            <Popover open={menuCtx.active === 'tokens'} anchorEl={menuCtx.anchorEl} onMouseMove={outMenu} onClose={closeMenu} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}>
              <Box sx={menu} onMouseEnter={onMenu} onMouseLeave={closeMenu}>
                <Link href='/blocks' underline='none'>
                  <Box sx={menuItem}>
                    <Typography sx={menuText}>Transactions</Typography>
                  </Box>
                </Link>
                <Link href='/blocks' underline='none'>
                  <Box sx={menuItem}>
                    <Typography sx={menuText}>Blocks</Typography>
                  </Box>
                </Link>
                <Link href='/blocks' underline='none'>
                  <Box sx={menuItem}>
                    <Typography sx={menuText}>Top Accounts</Typography>
                  </Box>
                </Link>
              </Box>
            </Popover>
            <Box sx={menuButton}><Typography sx={menuButtonText}>Resources</Typography></Box>
            <Box sx={menuButton}><Typography sx={menuButtonText}>Misc</Typography></Box>
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
      <Box sx={band} />
    </Box>
  );
}

export default MainPage;
