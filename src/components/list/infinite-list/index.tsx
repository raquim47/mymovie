import Loader from 'components/ui/Loader';
import * as S from './styles';

const InfiniteList = <T,>({
  data,
  isFetching,
  hasNextPage,
  observerRef,
  renderItem,
}: {
  data: T[][];
  isFetching: boolean;
  hasNextPage: boolean;
  observerRef: React.RefObject<HTMLDivElement>;
  renderItem: (item: T[], index: number) => React.ReactNode;
}) => {
  return (
    <S.ListBlock>
      {data.map((list, index) => (
        <S.RatioBlock key={index}>{renderItem(list, index)}</S.RatioBlock>
      ))}
      {isFetching && <Loader />}
      {hasNextPage && <S.Observer ref={observerRef} />}
    </S.ListBlock>
  );
};

export default InfiniteList;
