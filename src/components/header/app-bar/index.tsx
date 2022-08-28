import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import AppBarLogoName from './logo-name';
import AppBarUserMenu from './user-menu';
import { toggleMenu } from '../../../features/local/localSlice';
import AppBarDesktopNav from './desktop-nav';

function ResponsiveAppBar() {
  const dispatch = useDispatch();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => dispatch(toggleMenu())}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <AppBarLogoName />

          <AppBarDesktopNav />

          <Box
            sx={{ display: { xs: 'none', md: 'flex' } }}
            className="invisible"
          >
            <AppBarLogoName />
          </Box>

          <AppBarUserMenu contained={false} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
