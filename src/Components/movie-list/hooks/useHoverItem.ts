import { useState } from 'react';

const useHoverItem = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleHoverChange = (index: number = -1) => {
    setHoveredIndex(index);
  };

  const getHoverStyles = (index: number, rowSize: number, hoveredIndex: number) => {
    const isHovered = hoveredIndex === index;
    const isPushed = !isHovered && hoveredIndex !== -1;
    const xDirection = isPushed ? (hoveredIndex < index ? 1 : -1) : 0;
    const xMove = `${xDirection * (hoveredIndex === 0 || hoveredIndex === rowSize - 1 ? 20 : 10)}%`;

    return { isHovered, isPushed, xMove };
  };

  return { hoveredIndex, getHoverStyles, handleHoverChange };
};

export default useHoverItem;
