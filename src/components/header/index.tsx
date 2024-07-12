import { useEffect, useState } from 'react';
import NavLeft from './nav-left';
import NavTop from './nav-top';

const Header = () => {
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
  
  return <>{isMobile ? <NavTop /> : <NavLeft />}</>;
};

export default Header;
