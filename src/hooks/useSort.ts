import { useState, useMemo } from 'react';

const useSort = <T>(
  data: T[][],
  sortOptions: { [key: string]: (a: T, b: T) => number }
) => {
  const firstSortOrder = Object.keys(sortOptions)[0];
  const [sortOrder, setSortOrder] = useState(firstSortOrder);

  const sortedData = useMemo(() => {
    if (data.length === 0) return [];

    const listSize = data[0].length;
    const mergedData = data.flat();

    const sortedMergedData = mergedData.sort(sortOptions[sortOrder]);

    const result: T[][] = [];
    for (let i = 0; i < sortedMergedData.length; i += listSize) {
      result.push(sortedMergedData.slice(i, i + listSize));
    }
    return result;
  }, [data, sortOrder, sortOptions]);

  return { sortedData, sortOrder, setSortOrder };
};
export default useSort;
