import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Divider, SwipeableDrawer } from '@mui/material';
import { toggleMenu } from '../../../features/local/localSlice';
import AppBarUserMenu from '../app-bar/user-menu';
import { useMenuItems, useValidUser } from '../../../app/hooks';
import SideNavMenuItems from './sidenav-menu-items';

const SideNav = () => {
  const dispatch = useDispatch();

  const validUser = useValidUser();
  const menuItems = useMenuItems();

  return (
    <SwipeableDrawer
      anchor="left"
      open
      onClose={() => dispatch(toggleMenu())}
      onOpen={() => {}}
    >
      <Box sx={{ width: '75vw' }} role="presentation">
        <div className="h-14 p-4 flex justify-between items-center">
          <span className="text-gray-700 text-xl font-bold">Menü</span>
          <AppBarUserMenu />
        </div>
        <Divider />
        {validUser && menuItems && (
          <SideNavMenuItems id="" menuItems={menuItems} />
        )}
      </Box>
    </SwipeableDrawer>
  );
};

export default SideNav;
