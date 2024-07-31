import AuthForm from 'components/auth-form/AuthForm';
import InputField from 'components/auth-form/InputField';
import Buttons from 'components/ui/buttons';
import useLogin from 'hooks/auth/useLogin';
import PATH from 'utils/path';

import { validateLogin } from './validate';

const LoginPage = () => {
  const { login, googleLogin, isPending } = useLogin()


  return (
    <AuthForm title="로그인" submitAction={login} validate={validateLogin}>
      <InputField name="email" type="email" label="이메일" />
      <InputField name="password" type="password" label="비밀번호" />
      <Buttons.Base accent type="submit" disabled={isPending}>
        로그인
      </Buttons.Base>
      <Buttons.Base type="button" onClick={() => googleLogin()} disabled={isPending}>
        Google 로그인
      </Buttons.Base>
      <Buttons.Link to={PATH.SIGNUP} className={isPending ? 'disabled' : ''}>
        회원가입
      </Buttons.Link>
    </AuthForm>
  );
};

export default LoginPage;
