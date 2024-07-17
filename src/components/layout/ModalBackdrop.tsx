import HomePage from 'pages/home';
import RatedPage from 'pages/rated';
import SearchPage from 'pages/search';

const ModalBackdrop = ({ path }: { path: string | null }) => {
  if (!path) return null;

  if (path === '/') {
    return <HomePage />;
  }

  if (path === '/rated') {
    return <RatedPage />;
  }

  if (path.includes('/search')) {
    const queryParams = new URLSearchParams(path.split('?')[1]);
    const keyword = queryParams.get('keyword') || '';
    return <SearchPage presetKeyword={keyword} />;
  }

  return null;
};

export default ModalBackdrop;
