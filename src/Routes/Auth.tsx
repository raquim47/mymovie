import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignIn from '../components/auth/SignIn';
import NewAccount from '../components/auth/NewAccount';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Wrapper = styled.div`
  width: 480px;
  margin: 0 auto;

  h2 {
    margin-bottom: 20px;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
  }
`;

function Auth() {
  const navigate = useNavigate();
  const [newAccount, setNewAccount] = useState(false);
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const { isLoggedIn } = useSelector((state: RootState) => state.init);
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn]);

  return (
    <Wrapper>
      <h2>{!newAccount ? '로그인' : '회원가입'}</h2>
      {!newAccount ? (
        <SignIn toggleAccount={toggleAccount} />
      ) : (
        <NewAccount toggleAccount={toggleAccount} />
      )}
    </Wrapper>
  );
}

export default Auth;
