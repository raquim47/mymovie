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
      <div>
        <H3>이번 주 신작</H3>
        {leftData && <Banner data={leftData} />}
      </div>
      <div>
        <H3>이번 주 신작</H3>
        {rightData && <Banner data={rightData} />}
      </div>
    </BannersContainer>
  );
};

export default BannerLayout;
