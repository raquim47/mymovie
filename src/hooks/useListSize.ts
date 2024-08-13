import { useState, useEffect } from 'react';

const calculateListSize = (
  width: number,
  breakpoints: { [key: number]: number; default: number }
) => {
  const matchedBreakpoint = Object.keys(breakpoints)
    .map(Number)
    .filter((key) => key)
    .sort((a, b) => b - a)
    .find((breakpoint) => width >= breakpoint);

  return matchedBreakpoint !== undefined
    ? breakpoints[matchedBreakpoint]
    : breakpoints.default;
};

const useListSize = (breakpoints: { [key: number]: number; default: number }) => {
  const [listSize, setListSize] = useState(
    calculateListSize(window.innerWidth, breakpoints)
  );

  useEffect(() => {
    const handleResize = () => {
      setListSize(calculateListSize(window.innerWidth, breakpoints));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoints]);

  return listSize;
};

export default useListSize;
