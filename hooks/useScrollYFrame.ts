import { useEffect, useState } from 'react';

/** rAF-batched window scrollY for hero motion — keeps listeners out of App’s render loop. */
export function useScrollYFrame(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;
    let pending = 0;

    const flush = () => {
      rafId = null;
      setScrollY(pending);
    };

    const onScroll = () => {
      pending = window.scrollY;
      if (rafId == null) rafId = window.requestAnimationFrame(flush);
    };

    pending = window.scrollY;
    setScrollY(pending);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollY;
}

export function whiteFadeFromScroll(scrollY: number, vh: number): number {
  const endFade = vh * 0.9;
  if (scrollY <= 0) return 0;
  if (scrollY >= endFade) return 1;
  const t = scrollY / endFade;
  return t * t * (3 - 2 * t);
}
