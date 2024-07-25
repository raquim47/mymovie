import { IMovie } from 'services/movies/types';
import ST from './styles';
import { getMovieImagePath } from 'utils/movie-image-path';

const Banner = ({ data }: { data: IMovie }) => {
  return (
    <ST.Link to={`/movies/${data.id}`} bg={getMovieImagePath(data, 'backdrop', 'w1280')}>
      <ST.Caption>
        <h4>{data.title}</h4>
        <p>{data.tagline}</p>
      </ST.Caption>
    </ST.Link>
  );
};

export default Banner;
