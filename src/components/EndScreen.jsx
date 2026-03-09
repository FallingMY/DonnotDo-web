import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ModuleCard } from './ModuleCard';
import { IndustrialButton } from './IndustrialButton';

export const EndScreen = ({ score, totalRounds, onRestart, ...rest }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [displayRate, setDisplayRate] = useState(0);
  const successRate = totalRounds > 0 ? Math.round(((totalRounds - score) / totalRounds) * 100) : 0;
  const tweenRef = useRef(null);

  useEffect(() => {
    const obj = { s: 0, r: 0 };
    tweenRef.current = gsap.to(obj, {
      s: score,
      r: successRate,
      duration: 0.6,
      ease: 'power3.out',
      onUpdate: () => {
        setDisplayScore(Math.round(obj.s));
        setDisplayRate(Math.round(obj.r));
      }
    });
    return () => { if (tweenRef.current) tweenRef.current.kill(); };
  }, [score, successRate]);

  const scoreDisplay = String(displayScore).padStart(3, '0');

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <ModuleCard moduleId="RESULT" name="GAME OVER" {...rest}>
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
              {displayRate}%
            </div>
          </div>

          <div className="font-mono text-sm text-text-secondary">
            {score} PENALTIES IN {totalRounds} ROUNDS
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
