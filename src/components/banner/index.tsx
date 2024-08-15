import * as S from './styles';
import { getMovieImagePath } from 'utils/image-path';
import { IMovie } from 'services/movies/types';
import { useLocation } from 'react-router-dom';

const Banner = ({ data }: { data: IMovie }) => {
  const location = useLocation();
  return (
    <S.Link
      to={`/movies/${data.id}`}
      state={{ path: location.pathname }}
      bg={getMovieImagePath(data, 'backdrop', 'w1280')}
    >
      <S.Caption>
        <h4>{data.title}</h4>
      </S.Caption>
    </S.Link>
  );
};

export default Banner;
