import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useMenuItems, useValidUser } from '../../../../app/hooks';
import { NavigationItem } from '../../../../app/types';

const AppBarDesktopNav = () => {
  const validUser = useValidUser();

  const menuItems = useMenuItems();

  const navigate = useNavigate();
  const location = useLocation();

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [innerMenuItems, setInnerMenuItems] = React.useState<NavigationItem[]>(
    [],
  );

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    items: NavigationItem[],
  ) => {
    setInnerMenuItems(items);
    setAnchor(event.currentTarget);
  };

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
                onClick={(event) => {
                  if (item.items) {
                    handleOpenMenu(event, item.items);
                  } else {
                    navigate(item.link || '/');
                  }
                }}
              >
                <span
                  className={
                    item.link && location.pathname.includes(item.link)
                      ? 'border-b-2 border-white'
                      : ''
                  }
                >
                  {item.label}
                </span>
              </Button>
            ))}
        </div>
      )}

      <Menu
        id="nav-menu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        {innerMenuItems.map((innerItem: NavigationItem) => (
          <MenuItem
            id={`nav-item-${innerItem.label.toLowerCase()}`}
            key={`nav-item-${innerItem.label.toLowerCase()}`}
            onClick={() => {
              setAnchor(null);
              navigate(innerItem.link || '/');
            }}
          >
            <span
              className={
                innerItem.link && location.pathname.includes(innerItem.link)
                  ? 'border-b-2 border-[#1976d2]'
                  : ''
              }
            >
              {innerItem.label}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AppBarDesktopNav;
