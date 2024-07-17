import { useState } from 'react';

const useHoverListItem = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const handleHoverChange = (index: number) => {
    setHoveredIndex(index);
  };

  const getClasses = (index: number, listSize: number) => {
    if (hoveredIndex === -1) return;
    let classNames = '';
    if (hoveredIndex === 0) classNames += ' first-hovered';
    if (hoveredIndex === listSize - 1) classNames += ' last-hovered';
    if (index < hoveredIndex) classNames += ' before-hovered';
    if (index > hoveredIndex) classNames += ' after-hovered';
    return classNames.trim();
  };

  return { handleHoverChange, getClasses };
};

export default useHoverListItem;
