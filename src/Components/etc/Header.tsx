import styled from 'styled-components';

const Wrapper = styled.header`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: auto;
  right: 0;
  width: calc(100% - 240px);
  height: 80px;
  padding-top: 40px;
  padding-right: 40px;
  background-color: ${(props) => props.theme.black.darker};
`;
const Auth = styled.div``;

function Header() {
  return (
    <Wrapper>
      <Auth>
        <button>로그인</button>
      </Auth>
    </Wrapper>
  );
}

export default Header;
