import { useEffect, type RefObject } from 'react';

export function useClickOutside(
  containerRef: RefObject<HTMLElement | null>,
  onClickOutside: () => void
): void {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown-container')) {
        onClickOutside();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [containerRef, onClickOutside]);
}
