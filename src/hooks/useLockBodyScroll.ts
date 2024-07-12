import { useEffect } from 'react';

const useLockBodyScroll = () => {
  useEffect(() => {
    document.body.classList.add('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);
};

export default useLockBodyScroll;