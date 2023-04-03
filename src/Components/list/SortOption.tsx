import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { sortName, ISortType } from '../../utils/utils';

const Wrapper = styled.div`
  position: relative;
  width: 150px;
  font-size: 14px;
  font-weight: 300;
`;

const DropdownBtn = styled.div<{ isOpen: boolean }>`
  position: relative;
  height: 34px;
  background-color: ${(props) => props.theme.gray};
  border-radius: ${(props) => (props.isOpen ? '4px 4px 0 0' : '4px')};
  padding: 8px;
  cursor: pointer;

  .arrow {
    position: absolute;
    right: 10px;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.gray};
  border-radius: 0 0 4px 4px;
  overflow: hidden;
  z-index: 1000;
`;

const DropdownOption = styled.li`
  border-top: 1px solid ${(props) => props.theme.black.middle};
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.purpleDark};
  }
`;

interface ISortOption {
  sortTypeArr: ISortType[];
  setSortType: React.Dispatch<React.SetStateAction<ISortType>>;
}

function SortOption({ sortTypeArr, setSortType }: ISortOption) {
  const dropDownMenuRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currName, setCurrName] = useState(sortName[sortTypeArr[0]]);

  // 외부 클릭 감지
  useEffect(() => {
    const onClickOutside = (event: Event) => {
      if (
        dropDownMenuRef.current &&
        !dropDownMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('touchstart', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('touchstart', onClickOutside);
    };
  }, []);

  const onClickOption = (sortType: ISortType) => () => {
    setCurrName(sortName[sortType]);
    setIsOpen(false);
    setSortType(sortType);
  };

  return (
    <Wrapper>
      <DropdownBtn onClick={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
        {currName} <span className='arrow'>▾</span>
      </DropdownBtn>
      {isOpen && (
        <DropdownMenu ref={dropDownMenuRef}>
          {sortTypeArr.map((sortType) => {
            if (sortName[sortType] !== currName) {
              return (
                <DropdownOption
                  key={sortType}
                  onClick={onClickOption(sortType)}
                >
                  {sortName[sortType]}
                </DropdownOption>
              );
            }
          })}
        </DropdownMenu>
      )}
    </Wrapper>
  );
}
export default SortOption;
