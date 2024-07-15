import HomePage from 'pages/home';
import RatedPage from 'pages/rated';
import { useEffect } from 'react';

const ModalBackdrop = ({ path }: { path: string | null }) => {
  useEffect(() => {}, []);

  switch (path) {
    case '/':
      return <HomePage />;
    case '/rated':
      return <RatedPage />;
    default:
      return null;
  }
};

export default ModalBackdrop;
