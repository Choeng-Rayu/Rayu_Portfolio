'use client';

import { useState, useEffect, RefObject } from 'react';

interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView(
  ref: RefObject<Element>,
  options: IntersectionOptions = {}
): boolean {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [ref, threshold, rootMargin, triggerOnce]);

  return isInView;
}
