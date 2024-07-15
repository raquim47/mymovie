import { Link } from 'react-router-dom';

const RatedPage = () => {
  return (
    <>
      <Link to={'/movies/1022789'} state={{ from: '/rated' }}>
        링크
      </Link>
    </>
  );
};

export default RatedPage;
