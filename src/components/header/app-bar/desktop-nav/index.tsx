import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../../../app/store';
import { useMenuItems, useValidUser } from '../../../../app/hooks';

const AppBarDesktopNav = () => {
  const validUser = useValidUser();

  const menuItems = useMenuItems();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: {
          xs: 'none',
          md: 'flex',
        },
      }}
    >
      {validUser && (
        <div className="flex mx-auto">
          {menuItems &&
            menuItems.map((item, index) => (
              <Button
                key={`main-menu-item-${index}`}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
              >
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? 'border-b-2 border-white' : ''}`
                  }
                  to={item.link}
                >
                  {item.label}
                </NavLink>
              </Button>
            ))}
        </div>
      )}
    </Box>
  );
};

export default AppBarDesktopNav;
