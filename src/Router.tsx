import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Detail from './Routes/Detail';
import Drama from './Routes/Drama';
import Favorite from './Routes/Favorite';
import Home from './Routes/Home';
import Movie from './Routes/Movie';
import NotFound from './Routes/NotFound';
import Rate from './Routes/Rate';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'movie',
        element: <Movie />,
      },
      {
        path: 'drama',
        element: <Drama />, 
      },
      {
        path: 'rate',
        element: <Rate />, 
      },
      {
        path: 'favorite',
        element: <Favorite />, 
      },
      {
        path: 'search',
        element: <Search />,
      },
    ],

    errorElement: <NotFound />,
  },
]);

export default router;
