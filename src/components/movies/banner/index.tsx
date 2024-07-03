import { IMovieDetails } from 'services/movies/types';
import { Figure, Caption } from './styled';
import { getMovieImagePath } from '../utils';

const Banner = ({ data }: { data: IMovieDetails }) => {
  return (
    <Figure>
      <img src={getMovieImagePath(data, 'backdrop', 'w1280')} alt={data.title} />
      <Caption>
        <h4>{data.title}</h4>
        <p>{data.tagline}</p>
      </Caption>
    </Figure>
  );
};
export default Banner;
