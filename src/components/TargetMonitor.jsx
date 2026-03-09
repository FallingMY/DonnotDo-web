import { useScrambleText } from '../hooks/useScrambleText';
import { ModuleCard } from './ModuleCard';
import './style.css';

export const TargetMonitor = ({ actionText, currentRound, totalRounds }) => {
  const scrambledText = useScrambleText(actionText);

  const roundDisplay = String(currentRound).padStart(2, '0');
  const totalDisplay = String(totalRounds).padStart(2, '0');

  return (
    <ModuleCard moduleId="TARGET" name="CURRENT ACTION">
      <div className="space-y-4">
        <div className="font-mono text-sm text-text-secondary uppercase tracking-widest">
          ROUND {roundDisplay} / {totalDisplay}
        </div>
        <div className="scrambled-text font-pixel font-pixel-render text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-text-primary min-h-[120px] md:min-h-[160px] flex items-center justify-center text-center px-4 break-words leading-normal tracking-normal">
          {scrambledText}
        </div>
      </div>
    </ModuleCard>
  );
};
