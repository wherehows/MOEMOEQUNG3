import { useLayoutEffect, useRef } from 'react';
import usePrevious from './usePrevious';
import useWindowResize from './useWindowResize';

type UseResponsiveWebProps = {
  bp: number;
  onIntersection: (isUnderBp: boolean) => void;
}[];

const useResponsiveWeb = (breakpoints?: UseResponsiveWebProps) => {
  const viewportWidth = useWindowResize()[0];
  const priorViewportWidth = usePrevious(viewportWidth);
  const isInitRef = useRef(false);

  useLayoutEffect(() => {
    if (!breakpoints?.length || !priorViewportWidth) {
      return;
    }

    for (let i = 0; i < breakpoints.length; i++) {
      const { bp, onIntersection } = breakpoints[i];

      if (viewportWidth <= priorViewportWidth && bp >= viewportWidth) {
        onIntersection(true);
      } else if (viewportWidth > priorViewportWidth && bp < viewportWidth) {
        onIntersection(false);
      }
    }
  }, [viewportWidth, priorViewportWidth]);

  useLayoutEffect(() => {
    if (!breakpoints?.length || !viewportWidth || isInitRef.current) {
      return;
    }

    for (let i = 0; i < breakpoints.length; i++) {
      const { bp, onIntersection } = breakpoints[i];

      if (bp >= viewportWidth) {
        onIntersection(true);
      } else if (bp < viewportWidth) {
        onIntersection(false);
      }
    }

    isInitRef.current = true;
  }, [viewportWidth]);

  return {
    isUnder960px: viewportWidth <= 960,
  };
};

export default useResponsiveWeb;
