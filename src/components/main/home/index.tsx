import { useCurrentUser, useRuns } from '../../../app/hooks';
import RunDashboardCard from '../../runs/dashboard/card';
import PokemonPreview from './preview';

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
      <div className="flex justify-center gap-4 p-1">
        <div className="h-[1px] bg-gray-400 w-16 my-auto" />
        <span className="text-sm text-gray-400">Aktueller Run</span>
        <div className="h-[1px] bg-gray-400 w-16 my-auto" />
      </div>
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
