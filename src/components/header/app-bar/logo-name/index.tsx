import Typography from '@mui/material/Typography';
import * as React from 'react';
import { APP_NAME } from '../../../../app/constants';

function AppBarLogoName() {
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        className="flex"
        component="div"
        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
      >
        <img className="w-12 h-12 rounded-lg" alt="Logo" src="/logo512.webp" />

        <span className="my-auto ml-4">{APP_NAME}</span>
      </Typography>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
      >
        {APP_NAME}
      </Typography>
    </>
  );
}

export default AppBarLogoName;
