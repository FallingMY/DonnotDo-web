import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useScorePulse(elRef, score) {
  const prevScore = useRef(score);
  const tweensRef = useRef([]);

  useEffect(() => {
    const el = elRef.current;
    if (!el || prevScore.current === score) return;

    const increased = score > prevScore.current;
    prevScore.current = score;

    // Kill previous tweens before creating new ones
    tweensRef.current.forEach(t => t.kill());
    tweensRef.current = [];

    // Flash yellow
    tweensRef.current.push(
      gsap.fromTo(el,
        { color: '#F5D300' },
        { color: '', duration: 0.05, ease: 'none' }
      )
    );

    // Scale pulse
    tweensRef.current.push(
      gsap.fromTo(el,
        { scale: 1.05 },
        { scale: 1, duration: 0.2, ease: 'power3.out' }
      )
    );

    // Penalty drop
    if (increased) {
      tweensRef.current.push(
        gsap.fromTo(el,
          { y: 0 },
          { y: 3, duration: 0.075, ease: 'power2.in', yoyo: true, repeat: 1 }
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  // Cleanup all tweens on unmount
  useEffect(() => {
    return () => {
      tweensRef.current.forEach(t => t.kill());
    };
  }, []);
}
