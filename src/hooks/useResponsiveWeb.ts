import useWindowResize from './useWindowResize';

const useResponsiveWeb = () => {
  const viewportWidth = useWindowResize()[0];

  return {
    isUnder960px: viewportWidth <= 960,
  };
};

export default useResponsiveWeb;
