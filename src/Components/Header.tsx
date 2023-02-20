import styled from "styled-components";

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: auto;
  right: 0;
  width: calc(100% - 240px);
  height: 80px;
  background-color: ${props => props.theme.black.darker};
  border: 1px solid red;
`

function Header(){
  return <Wrapper><h2>header</h2></Wrapper>
}

export default Header;