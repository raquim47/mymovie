import PATH from 'utils/path';
import ST from './styles';

function NotFound() {
  return (
    <ST.Container>
      <ST.Content>
        <ST.Title>404</ST.Title>
        <ST.Subtitle>페이지를 찾을 수 없습니다.</ST.Subtitle>
        <ST.HomeButton to={PATH.HOME}>Home</ST.HomeButton>
      </ST.Content>
    </ST.Container>
  );
}

export default NotFound;
