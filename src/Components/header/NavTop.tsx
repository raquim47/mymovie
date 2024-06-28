import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../store';
import Logo from './Logo';
import SearchForm from './SearchForm';

const Wrapper = styled.div`
  padding-top: 80px;
  
  @media (min-width: 961px) {
    display: none; 
  }
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  height: 70px;
  width: 100%;
  padding: 0 20px;
  background-color: ${(props) => props.theme.color.black.normal};
  z-index: ${props => props.theme.zIndex.topMenu};
`;

const ProfileBtn = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${(props) => props.theme.color.black.light};
  cursor: pointer;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Nav = styled.nav`
  padding: 0 20px;
  ul {
    display: flex;
    border-bottom: 1px solid ${(props) => props.theme.color.gray};
    padding-bottom: 5px;
    gap: 25px;
  }
`;

const NavItem = styled.li<{ isClicked: boolean | null }>`
  position: relative;
  font-size: ${(props) => props.theme.fontSizePx.xl};
  color: ${(props) =>
    props.isClicked ? props.theme.color.white.dark : props.theme.color.gray};
  font-weight: 600;
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.color.white.dark};
  }

  &::before {
    position: absolute;
    left: calc(100% + 12px);
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 60%;
    background-color: ${(props) => props.theme.color.gray};
    content: '';
  }

  &:last-child::before {
    content: none;
  }
`;

const SearchFormWrapper = styled.div`
  margin-top: 5px;
  margin-left: auto;
  margin-right: 20px;
`;

const LoginBtn = styled.div`
  margin-top: 5px;
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizePx.s};
  cursor: pointer;
  :hover {
    color: white;
  }
`;

function NavTop() {
  const location = useLocation();
  const isLoggedIn = useSelector((state: RootState) => state.init.isLoggedIn);
  const userPhoto = useSelector(
    (state: RootState) => state.userData?.userPhoto
  );
  const navigate = useNavigate();
  const [navDataArr, setNavDataArr] = useState([
    { name: '홈', url: 'home', isClicked: false },
    { name: '평가한 영화', url: 'rate', isClicked: false },
    { name: '찜한 영화', url: 'favorite', isClicked: false },
  ]);
  useEffect(() => {
    const updateNavDataArr = () => {
      setNavDataArr((prev) =>
        prev.map((item) => ({
          ...item,
          isClicked: location.pathname === `/${item.url}`,
        }))
      );
    };
  
    updateNavDataArr(); // 첫 렌더링 시 상태 업데이트
    // popstate 이벤트 리스너 추가
    window.addEventListener('popstate', updateNavDataArr);
    // 이벤트 리스너 정리
    return () => {
      window.removeEventListener('popstate', updateNavDataArr);
    };
  }, [location]);
  const onClickNavItem = (url: string) => () => navigate(`/${url}`);
  return (
    <Wrapper>
      <TopMenu>
        <Logo />
        <SearchFormWrapper>
          <SearchForm />
        </SearchFormWrapper>
        {!isLoggedIn ? (
          <LoginBtn onClick={() => navigate('/auth')}>로그인</LoginBtn>
        ) : (
          <ProfileBtn onClick={() => navigate('/profile')}>
            <img
              src={userPhoto ? userPhoto : require('../../assets/profile.png')}
              alt='유저 이미지'
            />
          </ProfileBtn>
        )}
      </TopMenu>
      <Nav>
        <ul>
          {navDataArr.map((item) => (
            <NavItem
              key={item.url}
              onClick={onClickNavItem(item.url)}
              isClicked={item.isClicked}
            >
              {item.name}
            </NavItem>
          ))}
        </ul>
      </Nav>
    </Wrapper>
  );
}
export default NavTop;
