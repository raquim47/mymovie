import { useState, useEffect } from 'react';

interface IBreakpoints {
  [key: number]: number;
  default: number;
}

const calculateListSize = (width: number, breakpoints: IBreakpoints) => {
  const sortedBreakpoints = Object.keys(breakpoints)
    .map(Number)
    .filter((key) => key)
    .sort((a, b) => b - a);

  const matchedBreakpoint = sortedBreakpoints.find((breakpoint) => width >= breakpoint);

  return matchedBreakpoint !== undefined
    ? breakpoints[matchedBreakpoint]
    : breakpoints.default;
};

const useSetListSize = (breakpoints: { [key: number]: number; default: number }) => {
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

export default useSetListSize;
