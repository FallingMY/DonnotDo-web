import { useRef } from 'react';
import { useEntranceTimeline } from '../hooks/useEntranceTimeline';
import { TargetMonitor } from './TargetMonitor';
import { ScoreBoard } from './ScoreBoard';

export const PlayingView = ({ actionText, currentRound, totalRounds, score, undoTrigger }) => {
  const containerRef = useRef(null);
  useEntranceTimeline(containerRef, []);

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <TargetMonitor
        actionText={actionText}
        currentRound={currentRound}
        totalRounds={totalRounds}
        undoTrigger={undoTrigger}
        data-animate="card"
      />
      <ScoreBoard score={score} data-animate="card" />
    </div>
  );
};
