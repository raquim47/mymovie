import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import NavLeft from './NavLeft';
import NavTop from './NavTop';

function Header() {
  const [isNavLeft, setIsNavLeft] = useState(true);
  const windowWidth = useSelector((state: RootState) => state.windowWidth);
  useEffect(() => {
    if (windowWidth <= 960) {
      setIsNavLeft(false);
    } else {
      setIsNavLeft(true);
    }
  }, [windowWidth]);
  return <header>{isNavLeft ? <NavLeft /> : <NavTop />}</header>;
}

export default Header;
