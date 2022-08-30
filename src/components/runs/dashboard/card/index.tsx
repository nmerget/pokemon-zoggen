import { Card, CardContent } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import { RunDashboardCardType } from './data';
import RunDashboardTable from '../table';

function RunDashboardCard({ run }: RunDashboardCardType) {
  const navigate = useNavigate();
  if (!run) {
    return null;
  }
  return (
    <Card className="relative">
      <CardActionArea
        id={`card-action-${run.name?.toLowerCase().replace(' ', '-')}`}
        onClick={() => navigate(`/runs/${run.groupId}/${run.id}`)}
      >
        <CardContent className="flex flex-col">
          <div className="absolute right-4 top-4 font-medium text-xs flex flex-end gap-2">
            <span className="rounded-full px-3 py-1.5 bg-blue-100 text-blue-600">
              Lvl: {run.lvlCap}
            </span>
            <span className="rounded-full px-3 py-1.5 bg-yellow-100 text-yellow-600">
              #Pok: {run.pokAmount}
            </span>
          </div>
          <span className="text-lg font-bold mb-4">{run.name}</span>
          <RunDashboardTable players={run.players || []} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default RunDashboardCard;
