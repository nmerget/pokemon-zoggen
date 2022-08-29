import React from 'react';
import RunDashboardCard from './card';
import { FbRun } from '../../../firebase/types';
import { useRuns } from '../../../app/hooks';

const RunsDashboard = () => {
  const runs = useRuns();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {runs.map((run: FbRun, index: number) => (
          <RunDashboardCard key={`run-${index}`} run={run} />
        ))}
      </div>
    </div>
  );
};

export default RunsDashboard;
