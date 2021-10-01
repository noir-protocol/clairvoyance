import React from 'react';
import {atom, useRecoilState} from 'recoil';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';

const root = {
  bgcolor: 'white',
  width: '100%',
  height: '55px',
};

const main = {
  width: '100%',
  maxWidth: '1400px',
  height: '100%',
  padding: 0,
};

const body = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  color: '#333',
  paddingLeft: '8px',
};

const menuButton: Readonly<any> = {
  color: '#666',
  textTransform: 'none',
  fontWeight: 'normal',
  padding: '8px 16px 8px 20px',
  fontSize: '0.9rem',
};

const menuButtonActive = {
  ...menuButton,
  color: '#0077ce',
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

export default function Header() {
  const [menuCtx, setMenuCtx] = useRecoilState(atom({
    key: 'menuContext',
    default: {
      active: '',
      anchorEl: null,
      onMenu: false,
      boundary: dummy(),
    }
  }));
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
      <Container maxWidth={false} disableGutters={true} sx={main}>
        <Box sx={body}>
          <Typography variant='h5' sx={{userSelect: 'none'}}>
            <Link href='/' color='inherit' underline='none'>BLEU</Link>
          </Typography>
          <Box sx={{display:{xs:'none',sm:'none',md:'flex'}}}>
            <Button sx={menuButton} href='/'>Home</Button>
            <Button sx={menuCtx.active ==='blockchain' ? menuButtonActive : menuButton} size='small' href='#' onMouseOver={openBlockchainMenu} endIcon={<KeyboardArrowDownIcon sx={{marginLeft: '-6px'}} />}>Blockchain</Button>
            <Popover sx={{cursor: 'pointer'}} open={menuCtx.active === 'blockchain'} anchorEl={menuCtx.anchorEl} onMouseMove={outMenu} onClose={closeMenu} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}>
              <Box sx={menu} onMouseEnter={onMenu} onMouseLeave={outMenuPopup}>
                <Link href='/txs' underline='none'>
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
                <Link href='/account' underline='none'>
                  <Box sx={menuItem}>
                    <Typography sx={menuText}>Top Accounts</Typography>
                  </Box>
                </Link>
              </Box>
            </Popover>
            <Button sx={menuCtx.active === 'tokens' ? menuButtonActive : menuButton} size='small' href='#' onMouseOver={openTokensMenu} endIcon={<KeyboardArrowDownIcon sx={{marginLeft: '-6px'}} />}>Tokens</Button>
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
            <Button sx={menuButton} href='#'>Resources</Button>
            <Button sx={menuButton} href='#'>Misc</Button>
          </Box>
          <IconButton edge='start' color='inherit' aria-label='menu' sx={{display:{sm:'block', md:'none'}}}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
