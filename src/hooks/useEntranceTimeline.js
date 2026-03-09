import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useEntranceTimeline(containerRef, deps = []) {
  const tlRef = useRef(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (tlRef.current) tlRef.current.kill();

    const cards = el.querySelectorAll('[data-animate="card"]');
    const buttons = el.querySelectorAll('[data-animate="button"]');
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', force3D: true } });

    if (cards.length) {
      tl.fromTo(cards, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.35 });
    }
    if (buttons.length) {
      tl.fromTo(buttons, { opacity: 0 }, { opacity: 1, stagger: 0.03, duration: 0.25 }, cards.length ? '-=0.1' : '0');
    }
    tlRef.current = tl;
    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return tlRef;
}
