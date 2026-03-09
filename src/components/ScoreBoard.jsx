import { useRef } from 'react';
import { ModuleCard } from './ModuleCard';
import { useScorePulse } from '../hooks/useScorePulse';

export const ScoreBoard = ({ score, ...rest }) => {
  const scoreRef = useRef(null);
  useScorePulse(scoreRef, score);

  const scoreDisplay = String(score).padStart(3, '0');

  return (
    <ModuleCard moduleId="SCORE" name="PENALTY" {...rest}>
      <div ref={scoreRef} className="font-mono text-6xl text-accent text-center py-4">
        {scoreDisplay}
      </div>
    </ModuleCard>
  );
};
