import { useEffect } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Components/Header';
import Nav from './Components/Nav';

const Wrapper = styled.div`
  padding-top: 80px;
  padding-left: 240px;
`

function Root() {
  const isMatch = useMatch('/');
  const navigate = useNavigate();
  useEffect(() => {
    isMatch && navigate('/movie');
  }, [isMatch]);
  return (
    <Wrapper>
      <Nav />
      <Header />
      <Outlet></Outlet>
    </Wrapper>
  );
}

export default Root;
