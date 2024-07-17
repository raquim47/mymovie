import useHeaderResponsive from 'hooks/ui/header-responsive';
import NavLeft from './nav-left';
import NavTop from './nav-top';

const Header = () => {
  const { isMobile } = useHeaderResponsive();
  return <>{isMobile ? <NavTop /> : <NavLeft />}</>;
};

export default Header;
