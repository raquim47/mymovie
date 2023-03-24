import { useState } from 'react';
import styled from 'styled-components';
import SignIn from '../components/auth/SignIn';
import NewAccount from '../components/auth/NewAccount';

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
  const [newAccount, setNewAccount] = useState(false);
  const toggleAccount = () => setNewAccount((prev) => !prev);

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
