export const getClasses = (hoveredIndex: number, index: number, listSize: number) => {
  if (hoveredIndex === -1) return;
  let classNames = '';
  if (hoveredIndex === 0) classNames += ' first-hovered';
  if (hoveredIndex === listSize - 1) classNames += ' last-hovered';
  if (index < hoveredIndex) classNames += ' before-hovered';
  if (index > hoveredIndex) classNames += ' after-hovered';
  return classNames.trim();
};

export const GENRES: {
  [key: string]: string;
} = {
  28: '액션',
  12: '모험',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '공포',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV',
  53: '스릴러',
  10752: '전쟁',
  37: '서부',
};
