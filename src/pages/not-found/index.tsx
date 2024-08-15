import ErrorView from 'components/error/error-view';
import PATH from 'utils/path';

function NotFound() {
  return <ErrorView code={404} message="페이지를 찾을 수 없습니다." to={PATH.HOME} />;
}

export default NotFound;
