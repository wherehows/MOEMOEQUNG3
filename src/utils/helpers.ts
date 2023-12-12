export const isOnDevelopment = () => process.env.GATSBY_MODE === 'development';

export const moveTargetToLast = <T>(
  arr: T[],
  matcher: (arg: T) => boolean,
): T[] => {
  const res = [];
  let lastValue = null;

  for (let i = 0; i < arr.length; i++) {
    if (matcher(arr[i])) {
      lastValue = arr[i];
    } else {
      res.push(arr[i]);
    }
  }

  return lastValue ? [...res, lastValue] : res;
};
