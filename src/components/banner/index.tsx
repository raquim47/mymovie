import ST from './styles';
import { getMovieImagePath } from 'utils/image-path';
import { IMovie } from 'services/movies/types';

const Banner = ({ data }: { data: IMovie }) => {
  return (
    <ST.Link to={`/movies/${data.id}`} bg={getMovieImagePath(data, 'backdrop', 'w1280')}>
      <ST.Caption>
        <h4>{data.title}</h4>
      </ST.Caption>
    </ST.Link>
  );
};

export default Banner;
