import AuthForm from 'components/auth-form/AuthForm';
import InputField from 'components/auth-form/InputField';
import { login } from 'services/auth';
import { validateLogin } from './validate';

const LoginPage = () => {
  return (
    <AuthForm title="로그인" onValidSubmit={login} validate={validateLogin}>
      <InputField name="email" type="email" />
      <InputField name="password" type="password" />
      <button type="submit">로그인</button>
    </AuthForm>
  );
};

export default LoginPage;
