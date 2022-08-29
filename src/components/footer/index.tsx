import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react';
import { RootState } from '../../app/store';
import { getGlobalStatsString } from '../../app/utils';
import { useRuns, useUsers } from '../../app/hooks';

function Footer() {
  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase,
  ) as any;

  const users = useUsers();
  const runs = useRuns();

  return (
    <Box
      sx={{ backgroundColor: 'primary.main' }}
      className="flex-grow-0 flex-shrink-0 w-full h-16"
    >
      {firebaseSelector?.profile?.isEmpty === false && users && runs && (
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
