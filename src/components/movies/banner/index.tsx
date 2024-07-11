import { IMovieDetails } from 'services/movies/types';
import { Figure, Caption } from './styled';
import { getMovieImagePath } from '../utils';
import { InitialDetailBox } from '../styled';
import { useId } from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ data }: { data: IMovieDetails }) => {
  const layoutId = useId();
  return (
    <Link to={`movies/${data.id}?layoutId=${layoutId}`}>
      {/* div로 수정 */}
      <Figure>
        <img src={getMovieImagePath(data, 'backdrop', 'w1280')} alt={data.title} />
        <Caption>
          <h4>{data.title}</h4>
          <p>{data.tagline}</p>
        </Caption>
        <InitialDetailBox layoutId={layoutId} />
      </Figure>
    </Link>
  );
};

export default Banner;
