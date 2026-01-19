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
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
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
