import { useCurrentUser, useRuns } from '../../../app/hooks';
import RunDashboardCard from '../../runs/dashboard/card';
import PokemonPreview from './preview';
import TextDivider from '../../base/text-divider';
import React from 'react';

const Home = () => {
  const runs = useRuns();
  const currentUser = useCurrentUser();

  if (!runs || runs.length === 0) {
    return (
      <div className="flex w-full">
        <span className="mx-auto">Es wurde noch kein Run angelegt.</span>
      </div>
    );
  }

  const lastRun = runs.at(-1);

  return (
    <div className="flex flex-col gap-2">
      <TextDivider text="Aktueller Run" />
      <div className="flex flex-col md:grid md:grid-cols-2 gap-2">
        {lastRun && <RunDashboardCard run={lastRun} />}
        {currentUser && lastRun && (
          <PokemonPreview run={lastRun} currentUser={currentUser} />
        )}
      </div>
    </div>
  );
};

export default Home;
