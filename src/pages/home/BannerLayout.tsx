import Banner from 'components/movies/banner';
import { IMovieDetails } from 'services/movies/types';
import { BannersContainer, H3 } from './styled';

const BannerLayout = ({
  leftData,
  rightData,
}: {
  leftData?: IMovieDetails;
  rightData?: IMovieDetails;
}) => {
  return (
    <BannersContainer>
      {leftData && (
        <div>
          <H3>이번 주 신작</H3>
          <Banner data={leftData} />
        </div>
      )}
      {rightData && (
        <div>
          <H3>개봉 예정</H3>
          <Banner data={rightData} />
        </div>
      )}
    </BannersContainer>
  );
};

export default BannerLayout;
