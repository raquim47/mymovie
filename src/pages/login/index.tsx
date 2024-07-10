import AuthForm from 'components/auth-form/AuthForm';
import InputField from 'components/auth-form/InputField';
import { Btn, LinkBtn, SubmitBtn } from 'components/auth-form/styled';
import { useGoogleLogin, useLogin } from 'hooks/auth';
import { validateLogin } from './validate';

const LoginPage = () => {
  const { isLoading: loginIsLoading, mutate: login } = useLogin();
  const { isLoading: googleLoginIsLoading, mutate: googleLogin } = useGoogleLogin();

  const authLoading = loginIsLoading || googleLoginIsLoading;

  return (
    <AuthForm title="로그인" submitAction={login} validate={validateLogin}>
      <InputField name="email" type="email" label="이메일" />
      <InputField name="password" type="password" label="비밀번호" />
      <SubmitBtn type="submit" disabled={authLoading}>
        로그인
      </SubmitBtn>
      <Btn type="button" onClick={() => googleLogin()} disabled={authLoading}>
        Google 로그인
      </Btn>
      <LinkBtn to="/signup" className={authLoading ? 'disabled' : ''}>
        회원가입
      </LinkBtn>
    </AuthForm>
  );
};

export default LoginPage;