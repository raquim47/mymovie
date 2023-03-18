import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IGetMovieResult } from '../api';
import ListItem from './ListItem';

const Wrapper = styled.div`
  position: relative;
  :hover {
    button {
      opacity: 1;
    }
  }
`;

const Content = styled.div<{ height: number }>`
  padding-top: ${(props) =>
    ((props.height * 120) / 100 - props.height) / 2 + 'px'};
  padding-bottom: ${(props) =>
    ((props.height * 120) / 100 - props.height) / 2 + 'px'};
  overflow: hidden;
`;

const ContentInner = styled.div<{ height: number }>`
  position: relative;
  height: ${(props) => props.height + 'px'};
`;

const Row = styled(motion.div)<{ row: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.row}, 1fr)`};
  gap: 1%;
  position: absolute;
  top: 0;
  width: 100%;
`;

const NextBtn = styled(motion.button)`
  position: absolute;
  left: calc(100% + 4px);
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0);
  color: white;
  right: auto;
  border: none;
  opacity: 0;
  cursor: pointer;
  :hover {
    filter: brightness(1.5);
  }
`;

const PrevBtn = styled(NextBtn)`
  left: auto;
  right: calc(100% + 4px);
`;

const rowVariants = {
  hidden: ({ isNext }: { isNext: boolean }) => ({
    x: isNext ? 'calc(100% + 10px)' : 'calc(-100% - 10px)',
    height: 0, // 추가된 코드
  }),
  visible: {
    x: 0,
    height: 'auto', // 추가된 코드
  },
  exit: ({ isNext }: { isNext: boolean }) => ({
    x: isNext ? 'calc(-100% - 10px)' : 'calc(100% + 10px)',
    height: 0, // 추가된 코드
  }),
};

interface IListProps {
  data: IGetMovieResult;
  listType: string;
  rowSize: number;
  startIndex?: number;
  isSlideEnabled?: boolean;
  displayMode?: 'portrait' | 'landscape';
}

function List({
  data,
  listType,
  rowSize,
  startIndex = 0,
  isSlideEnabled = false,
  displayMode = 'landscape',
}: IListProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(false);
  const [isNext, setIsNext] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [itemHight, setItemHight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // 좌우 슬라이드 동작
  const changeIndex = (direction = 'next') => {
    if (!data) return;
    if (leaving) return;
    setLeaving(true);
    const totalMovies = data.results.length - 1;
    const maxIndex = Math.floor(totalMovies / rowSize) - 1;
    direction === 'next' ? setIsNext(true) : setIsNext(false);

    if (isNext) {
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    } else {
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  // 아이템 밀리는 애니메이션(hover한 아이템 체크)
  const handleHoverChange = (index: number) => {
    setHoveredIndex(index);
  };
  // 슬라이드 높이 설정
  useEffect(() => {
    const handleResize = () => {
      const wrapperWidth = contentRef.current?.offsetWidth || 0;
      const ratio = displayMode === 'landscape' ? 0.5 : 1.4;
      const height = Math.ceil(
        ((wrapperWidth * (101 - rowSize)) / 100 / rowSize) * ratio
      );
      console.log(height);
      setItemHight(height);
    };
    handleResize(); // 최초 렌더링 시 실행
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [contentRef, displayMode, rowSize]);

  return (
    <>
      <Wrapper ref={contentRef}>
        <Content height={itemHight}>
          <ContentInner height={itemHight}>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={{ isNext }}
            >
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
                key={index}
                custom={{ isNext }}
                row={rowSize}
              >
                {data?.results
                  .slice(startIndex)
                  .slice(rowSize * index, rowSize * index + rowSize)
                  .map((movie, index) => (
                    <ListItem
                      key={movie.id}
                      movieData={movie}
                      listType={listType}
                      index={index}
                      onHoverChange={handleHoverChange}
                      hoveredIndex={hoveredIndex}
                      rowSize={rowSize}
                      displayMode={displayMode}
                    />
                  ))}
              </Row>
            </AnimatePresence>
          </ContentInner>
        </Content>
        {isSlideEnabled ? (
          <>
            <PrevBtn key="prev" onClick={() => changeIndex('prev')}>
              <svg
                width="8"
                height="40"
                viewBox="0 0 10 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M9.476.09c.452.226.65.805.44 1.295L1.985 20l7.933 18.615c.208.49.011 1.07-.44 1.295-.452.226-.987.012-1.196-.477L0 20 8.281.567c.209-.49.744-.703 1.195-.477Z"
                  fill="currentColor"
                ></path>
              </svg>
            </PrevBtn>
            <NextBtn key="next" onClick={() => changeIndex()}>
              <svg
                width="8"
                height="40"
                viewBox="0 0 10 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M.524.09c-.452.226-.65.805-.44 1.295L8.015 20 .083 38.615c-.208.49-.011 1.07.44 1.295.452.226.987.012 1.196-.477L10 20 1.719.567C1.51.077.975-.136.524.09Z"
                  fill="currentColor"
                ></path>
              </svg>
            </NextBtn>
          </>
        ) : null}
      </Wrapper>
    </>
  );
}

export default List;

// const getOffset = () => {
//   const width = window.innerHeight;
// };
// getOffset();
// const [width, setWidth] = useState(window.innerWidth);
// useEffect(() => {
//   const handleResize = () => {
//     setWidth(window.innerWidth);
//   };

//   window.addEventListener('resize', handleResize);
//   return () => {
//     window.removeEventListener('resize', handleResize);
//   };
// }, []);
