import { TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { useSelector } from 'react-redux';
import { getPlayerName } from '../../../../app/utils';
import { RunsDashboardTableType } from './data';
import { RootState } from '../../../../app/store';
import { FbRunsPlayers, FirestoreScheme } from '../../../../firebase/types';
import { useUsers } from '../../../../app/hooks';

function RunDashboardTable({ players }: RunsDashboardTableType) {
  const users = useUsers();

  const getPName = (player: FbRunsPlayers): string =>
    getPlayerName(users?.find((user) => user.id === player.id)?.name);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />

            {players.map((player, index) => (
              <TableCell key={`th-${index}`}>{getPName(player)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow
              key={`tr-${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {getPName(player)}
              </TableCell>
              {players.map((oPlayer, i) => (
                <TableCell
                  key={`tr-${i}`}
                  className={`text-center ${
                    oPlayer.id === player.id
                      ? ''
                      : players
                          .find((p) => p.id === oPlayer.id)
                          ?.wins?.includes(player.id || '')
                      ? 'bg-green-200'
                      : 'bg-red-200'
                  }`}
                >
                  {oPlayer.id === player.id
                    ? 'X'
                    : players
                        .find((p) => p.id === oPlayer.id)
                        ?.wins?.includes(player.id || '')
                    ? 'Win'
                    : ''}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RunDashboardTable;
