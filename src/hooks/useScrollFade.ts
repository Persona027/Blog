import { useEffect, type RefObject } from 'react';

export function useScrollFade(
  refs: RefObject<HTMLElement | null>[],
  distance = 600
): void {
  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.max(0, 1 - window.scrollY / distance).toString();
      for (const ref of refs) {
        if (ref.current) {
          ref.current.style.opacity = opacity;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [refs, distance]);
}
