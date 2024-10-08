import BasicForm from 'components/form/basic-form';
import InputField from 'components/form/input-field';
import Buttons from 'components/ui/buttons';
import useForm from 'hooks/useForm';
import { validateEmail, validatePassword } from 'utils/form-validation';
import PATH from 'utils/path';
import useAuthSuccess from 'hooks/useAuthSuccess';
import { requestGoogleLogin, requestLogin } from 'services/auth';
import { useMutation } from '@tanstack/react-query';
import ErrorMessage from 'components/form/error-message';

const LoginPage = () => {
  const onAuthSuccess = useAuthSuccess();
  const { isLoading, handleSubmit, register, errors, setErrors, errorFocus } = useForm([
    'email',
    'password',
  ]);
  const { isPending, mutate: googleLogin } = useMutation({
    mutationFn: requestGoogleLogin,
    onSuccess: onAuthSuccess,
    onError: (error) => {
      if (error?.name === 'common') {
        setErrors((prev) => ({ ...prev, common: error.message }));
      }
    },
  });
  const isAllLoading = isLoading || isPending;

  return (
    <BasicForm title="로그인" onSubmit={handleSubmit(requestLogin, onAuthSuccess)}>
      <InputField
        {...register('email', validateEmail)}
        label="이메일"
        error={errors.email}
        isFocus={errorFocus === 'email'}
        autoFocus
      />
      <InputField
        {...register('password', validatePassword)}
        type="password"
        label="비밀번호"
        error={errors.password}
        isFocus={errorFocus === 'password'}
      />
      {errors.common && <ErrorMessage message={errors.common} />}
      <Buttons.Base accent type="submit" disabled={isAllLoading}>
        로그인
      </Buttons.Base>
      <Buttons.Base onClick={() => googleLogin()} type="button" disabled={isAllLoading}>
        Google 로그인
      </Buttons.Base>
      <Buttons.Link to={PATH.SIGNUP} disabled={isAllLoading}>
        회원가입
      </Buttons.Link>
    </BasicForm>
  );
};

export default LoginPage;
