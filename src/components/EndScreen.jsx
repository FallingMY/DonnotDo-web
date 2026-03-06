import { ModuleCard } from './ModuleCard';
import { IndustrialButton } from './IndustrialButton';

export const EndScreen = ({ score, totalRounds, onRestart }) => {
  const scoreDisplay = String(score).padStart(3, '0');
  const successRate = totalRounds > 0 ? Math.round((score / totalRounds) * 100) : 0;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <ModuleCard moduleId="RESULT" name="GAME OVER">
        <div className="space-y-6 text-center">
          <div>
            <div className="font-mono text-sm text-text-secondary uppercase mb-2">
              Final Score
            </div>
            <div className="font-mono text-8xl text-accent">
              {scoreDisplay}
            </div>
          </div>

          <div>
            <div className="font-mono text-sm text-text-secondary uppercase mb-2">
              Success Rate
            </div>
            <div className="font-mono text-4xl text-text-primary">
              {successRate}%
            </div>
          </div>

          <div className="font-mono text-sm text-text-secondary">
            {score} / {totalRounds} ROUNDS COMPLETED
          </div>

          <IndustrialButton
            variant="primary"
            onClick={onRestart}
            className="w-full"
          >
            Restart
          </IndustrialButton>
        </div>
      </ModuleCard>
    </div>
  );
};
