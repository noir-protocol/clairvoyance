import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
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
  padding: '8px 20px 8px 20px',
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

const menuText: Readonly<any> = {
  color: '#333',
  fontSize: '0.875rem',
};

const menuDivider = {
  margin: '8px 0px 8px 0px',
};

const dummy = (): {x:number, y:number, width:number, height:number} => {
  return {
    x: 0, y: 0, width: 0, height: 0,
  };
};

function MainPage() {
  const [menuCtx, setMenuCtx] = React.useState({
    active: '',
    anchorEl: null,
    onMenu: false,
    boundary: dummy(),
  });
  const openBlockchainMenu = (event: any) => {
    setMenuCtx({
      ...menuCtx,
      active: 'blockchain',
      anchorEl: event.currentTarget,
      boundary: event.currentTarget.getBoundingClientRect(),
    });
  };
  const openTokensMenu = (event: any) => {
    setMenuCtx({
      ...menuCtx,
      active: 'tokens',
      anchorEl: event.currentTarget,
      boundary: event.currentTarget.getBoundingClientRect(),
    });
  };
  const closeMenu = () => {
    setMenuCtx({
      active: '',
      anchorEl: null,
      onMenu: false,
      boundary: dummy(),
    });
  };
  const outMenu = (event: any) => {
    if (!menuCtx.onMenu) {
      if (menuCtx.active !== '') {
        const adjY = 5;
        if (event.clientX < menuCtx.boundary.x || event.clientX >= (menuCtx.boundary.x + menuCtx.boundary.width) ||
          event.clientY < menuCtx.boundary.y || event.clientY >= (menuCtx.boundary.y + menuCtx.boundary.height + adjY)) {
          closeMenu();
        }
      } else {
        closeMenu();
      }
    }
  };
  const outMenuPopup = () => {
    setMenuCtx({
      ...menuCtx,
      onMenu: false,
    });
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
            <Box sx={menuButton}><Link href='/' underline='none' sx={menuButtonText}>Home</Link></Box>
            <Box sx={menuButton} onMouseOver={openBlockchainMenu}><Link href='#' underline='none' sx={menuButtonText}>Blockchain &#128317;</Link></Box>
            <Popover sx={{cursor: 'pointer'}} open={menuCtx.active === 'blockchain'} anchorEl={menuCtx.anchorEl} onMouseMove={outMenu} onClose={closeMenu} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}>
              <Box sx={menu} onMouseEnter={onMenu} onMouseLeave={outMenuPopup}>
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
                <Divider sx={menuDivider} />
                <Link href='/blocks' underline='none'>
                  <Box sx={menuItem}>
                    <Typography sx={menuText}>Top Accounts</Typography>
                  </Box>
                </Link>
              </Box>
            </Popover>
            <Box sx={menuButton} onMouseOver={openTokensMenu}><Link href='#' underline='none' sx={menuButtonText}>Tokens &#128317;</Link></Box>
            <Popover sx={{cursor: 'pointer'}} open={menuCtx.active === 'tokens'} anchorEl={menuCtx.anchorEl} onMouseMove={outMenu} onClose={closeMenu} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}>
              <Box sx={menu} onMouseEnter={onMenu} onMouseLeave={outMenuPopup}>
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
            <Box sx={menuButton}><Link href='#' underline='none' sx={menuButtonText}>Resources</Link></Box>
            <Box sx={menuButton}><Link href='#' underline='none' sx={menuButtonText}>Misc</Link></Box>
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
