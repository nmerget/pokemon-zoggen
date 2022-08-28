import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { RootState } from '../../../../app/store';

const settings = ['Logout'];

const LoginButton = React.lazy(() => import('../../../base/buttons/login'));

function AppBarUserMenu() {
  const firebase = useFirebase();
  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase,
  ) as any;

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (setting?: string) => {
    if (setting === settings[0]) {
      firebase.logout();
    }
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {firebaseSelector?.profile?.isEmpty && (
        <Suspense fallback={<div>...</div>}>
          <LoginButton contained={false} />
        </Suspense>
      )}
      {firebaseSelector?.profile?.isEmpty === false && (
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt={firebaseSelector?.auth?.displayName}
              src={firebaseSelector?.auth?.photoURL}
            />
          </IconButton>
        </Tooltip>
      )}
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={() => handleCloseUserMenu(undefined)}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default AppBarUserMenu;
