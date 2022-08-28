import { FirebaseScheme } from '../firebase/types';

export const getPlayerName = (name?: string): string => {
  if (!name) {
    return 'XXX';
  }
  if (name.length > 4) {
    const splitName = name.split(' ');
    if (splitName.length === 2) {
      return `${splitName[0].substring(0, 2)}${splitName[1].substring(0, 1)}`;
    }
    return name.substring(0, 4);
  }
  return name;
};

export const getGlobalStatsString = (scheme: FirebaseScheme): string => {
  const players: any[] = [];
  let possibleWins = 0;
  if (scheme.runs) {
    scheme.runs.forEach((run) => {
      possibleWins += (run.players?.length || 0) - 1;
      run.players?.forEach((player) => {
        const id = player.id || '';
        const foundPlayer = players.find((p) => p.id === id);
        if (foundPlayer) {
          foundPlayer.wins = [...foundPlayer.wins, ...(player.wins || [])];
        } else {
          players.push({ ...player });
        }
      });
    });

    let statString = '';
    if (players.length > 0) {
      players
        .sort((a, b) => (a.wins.length > b.wins.length ? -1 : 1))
        .forEach((player, index) => {
          statString += `${getPlayerName(
            scheme.users?.find((user) => user.id === player.id)?.name,
          )}: ${player.wins.length}/${possibleWins} ${
            index !== players.length - 1 ? '-' : ''
          } `;
        });
      return statString;
    }
  }
  return 'Keine Stats';
};
