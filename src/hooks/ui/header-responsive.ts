import { useEffect, useState } from 'react';

const useHeaderResponsive = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile };
};

export default useHeaderResponsive;
