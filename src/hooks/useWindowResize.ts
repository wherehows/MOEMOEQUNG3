import { useLayoutEffect, useState } from 'react';

const useWindowResize = () => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const getSize = () => setSize([window.innerWidth, window.innerHeight]);

    getSize();

    window.addEventListener('resize', getSize);
    return () => window.removeEventListener('resize', getSize);
  }, []);

  return size;
};

export default useWindowResize;
