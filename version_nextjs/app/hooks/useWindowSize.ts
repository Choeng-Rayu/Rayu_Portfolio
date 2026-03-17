'use client';

import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    function handleResize() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150); // Debounce resize events
    }

    window.addEventListener('resize', handleResize);
    // Call immediately on mount
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(debounceTimer);
    };
  }, []);

  return windowSize;
}

export function useIsMobile(breakpoint: number = 768): boolean {
  const { width } = useWindowSize();
  return width !== undefined && width < breakpoint;
}

export function useIsTablet(breakpoint: number = 1024): boolean {
  const { width } = useWindowSize();
  return width !== undefined && width < breakpoint && width >= 768;
}

export function useIsDesktop(breakpoint: number = 1024): boolean {
  const { width } = useWindowSize();
  return width !== undefined && width >= breakpoint;
}
