import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useScrambleText } from '../hooks/useScrambleText';
import { ModuleCard } from './ModuleCard';
import './style.css';

export const TargetMonitor = ({ actionText, currentRound, totalRounds, undoTrigger, ...rest }) => {
  const scrambledText = useScrambleText(actionText);
  const cardRef = useRef(null);
  const textContainerRef = useRef(null);
  const prevRound = useRef(currentRound);
  const prevUndo = useRef(undoTrigger);

  // P6: Undo shake
  useEffect(() => {
    if (prevUndo.current === undoTrigger) return;
    prevUndo.current = undoTrigger;
    const el = cardRef.current;
    if (!el) return;
    gsap.fromTo(el, { x: -5 }, { x: 0, duration: 0.2, ease: 'power3.out' });
  }, [undoTrigger]);

  // P7: Round transition
  useEffect(() => {
    if (prevRound.current === currentRound) return;
    prevRound.current = currentRound;
    const el = textContainerRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.15, ease: 'power3.out' });
  }, [currentRound]);

  const roundDisplay = String(currentRound).padStart(2, '0');
  const totalDisplay = String(totalRounds).padStart(2, '0');

  return (
    <ModuleCard moduleId="TARGET" name="CURRENT ACTION" {...rest}>
      <div ref={cardRef} className="space-y-4">
        <div className="font-mono text-sm text-text-secondary uppercase tracking-widest">
          ROUND {roundDisplay} / {totalDisplay}
        </div>
        <div ref={textContainerRef} className="scrambled-text font-pixel font-pixel-render text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-text-primary min-h-[120px] md:min-h-[160px] flex items-center justify-center text-center px-4 break-words leading-normal tracking-normal">
          {scrambledText}
        </div>
      </div>
    </ModuleCard>
  );
};
