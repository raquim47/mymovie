import AuthForm from 'components/auth-form/AuthForm';
import InputField from 'components/auth-form/InputField';
import { LinkBtn, SubmitBtn } from 'components/auth-form/styled';
import { useLogin } from 'hooks/auth';
import { validateLogin } from './validate';

const LoginPage = () => {
  const { isLoading, mutate: login } = useLogin();
  return (
    <AuthForm title="로그인" submitAction={login} validate={validateLogin}>
      <InputField name="email" type="email" label="이메일" />
      <InputField name="password" type="password" label="비밀번호" />
      <SubmitBtn type="submit" disabled={isLoading}>
        로그인
      </SubmitBtn>
      <LinkBtn to="/signup">회원가입</LinkBtn>
    </AuthForm>
  );
};

export default LoginPage;
