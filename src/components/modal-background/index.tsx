import HomePage from 'pages/home';
import ReviewedPage from 'pages/reviewed';
import SearchPage from 'pages/search';
import WatchListPage from 'pages/watchlist';
import PATH from 'utils/path';

const ModalBackground = ({ path, keyword }: { path?: string; keyword: string }) => {
  switch (path) {
    case PATH.HOME:
      return <HomePage />;
    case PATH.SEARCH:
      return <SearchPage keyword={keyword} />;
    case PATH.WATCHLIST:
      return <WatchListPage />;
    case PATH.REVIEWED:
      return <ReviewedPage />;
    default:
      return null;
  }
};

export default ModalBackground;
