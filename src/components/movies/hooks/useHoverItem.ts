import { useState } from 'react';

const useHoverItem = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleHoverChange = (index: number = -1) => {
    setHoveredIndex(index);
  };

  return { hoveredIndex, handleHoverChange };
};

export default useHoverItem;
