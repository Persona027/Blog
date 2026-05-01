import { useState, useEffect, useRef, type RefObject } from 'react';

export function useScrollSpy(
  contentRef: RefObject<HTMLElement | null>,
  headingSelector = 'h2, h3',
  offset = 160
): string {
  const [activeId, setActiveId] = useState('');
  const activeIdRef = useRef('');

  useEffect(() => {
    const handleScroll = () => {
      const headings = contentRef.current?.querySelectorAll(headingSelector);
      if (!headings?.length) return;

      const triggerLine = window.scrollY + offset;

      let currentId = '';
      for (const heading of Array.from(headings) as HTMLElement[]) {
        const top = heading.getBoundingClientRect().top + window.scrollY;
        if (top <= triggerLine) {
          currentId = heading.id;
        } else {
          break;
        }
      }

      if (currentId && currentId !== activeIdRef.current) {
        activeIdRef.current = currentId;
        setActiveId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const initTimer = setTimeout(handleScroll, 300);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(initTimer);
    };
  }, [contentRef, headingSelector, offset]);

  return activeId;
}
