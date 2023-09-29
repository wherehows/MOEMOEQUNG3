import { useEffect, useRef } from 'react';

const usePrevious = <T,>(value: T) => {
  const priorRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    priorRef.current = value;
  }, []);

  return priorRef.current;
};

export default usePrevious;
