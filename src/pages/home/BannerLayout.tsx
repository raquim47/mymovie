import Banner from 'components/banner';
import { IMovie } from 'hooks/movies/types';
import ST from './styles';

const BannerLayout = ({
  leftData,
  rightData,
}: {
  leftData?: IMovie;
  rightData?: IMovie;
}) => {
  return (
    <ST.BannersContainer>
      {leftData && (
        <div>
          <ST.SectionTitle>이번 주 신작</ST.SectionTitle>
          <Banner data={leftData} />
        </div>
      )}
      {rightData && (
        <div>
          <ST.SectionTitle>개봉 예정</ST.SectionTitle>
          <Banner data={rightData} />
        </div>
      )}
    </ST.BannersContainer>
  );
};

export default BannerLayout;
