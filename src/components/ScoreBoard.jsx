import { ModuleCard } from './ModuleCard';

export const ScoreBoard = ({ score }) => {
  const scoreDisplay = String(score).padStart(3, '0');

  return (
    <ModuleCard moduleId="SCORE" name="CURRENT SCORE">
      <div className="font-mono text-6xl text-accent text-center py-4">
        {scoreDisplay}
      </div>
    </ModuleCard>
  );
};
