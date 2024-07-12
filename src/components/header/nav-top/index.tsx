import Logo from '../logo';
import SearchForm from '../search-form';
import Styled from './styled';

const NavTop = () => {
  return (
    <>
      <Styled.Header>
        <Logo />
        <SearchForm />
      </Styled.Header>
      <Styled.Nav></Styled.Nav>
    </>
  );
};

export default NavTop;
