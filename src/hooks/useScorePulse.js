import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useScorePulse(elRef, score) {
  const prevScore = useRef(score);

  useEffect(() => {
    const el = elRef.current;
    if (!el || prevScore.current === score) return;

    const increased = score > prevScore.current;
    prevScore.current = score;

    // Flash yellow
    gsap.fromTo(el,
      { color: '#F5D300' },
      { color: '', duration: 0.05, ease: 'none' }
    );

    // Scale pulse
    gsap.fromTo(el,
      { scale: 1.05 },
      { scale: 1, duration: 0.2, ease: 'power3.out' }
    );

    // Penalty drop
    if (increased) {
      gsap.fromTo(el,
        { y: 0 },
        { y: 3, duration: 0.075, ease: 'power2.in', yoyo: true, repeat: 1 }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);
}
