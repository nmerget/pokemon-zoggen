import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react';
import { RootState } from '../../app/store';
import { getGlobalStatsString } from '../../app/utils';
import { useRuns, useUsers, useValidUser } from '../../app/hooks';

function Footer() {
  const users = useUsers();
  const runs = useRuns();
  const validUser = useValidUser();

  return (
    <Box
      sx={{ backgroundColor: 'primary.main' }}
      className="flex-grow-0 flex-shrink-0 w-full h-16"
    >
      {validUser && users && runs && (
        <div className="max-w-screen-xl h-full flex mx-auto">
          <p className="text-sm font-medium text-white text-center m-auto">
            {getGlobalStatsString(runs, users)}
          </p>
        </div>
      )}
    </Box>
  );
}

export default Footer;
