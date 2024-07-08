import AuthForm from 'components/auth-form/AuthForm';
import InputField from 'components/auth-form/InputField';
import { useLogin } from 'hooks/auth';
import { useAuthForm } from 'hooks/auth-form';
import { validateLogin } from './validate';

const LoginPage = () => {
  const { onSuccess, onError } = useAuthForm();
  const { isLoading, mutate: login } = useLogin({ onSuccess, onError });
  return (
    <AuthForm title="로그인" submitAction={login} validate={validateLogin}>
      <InputField name="email" type="email" />
      <InputField name="password" type="password" />
      <button type="submit" disabled={isLoading}>
        로그인
      </button>
    </AuthForm>
  );
};

export default LoginPage;
