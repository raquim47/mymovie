import BasicForm from 'components/form/basic-form';
import InputField from 'components/form/input-field';
import Buttons from 'components/ui/buttons';
import FormCommonError from 'components/form/common-error';
import useForm from 'hooks/ui/useForm';
import { validateEmail, validatePassword } from 'utils/form-validation';
import PATH from 'utils/path';
import useLoginSuccess from 'hooks/auth/useLoginSuccess';
import { requestGoogleLogin, requestLogin } from 'services/auth';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

const LoginPage = () => {
  const onLogin = useLoginSuccess();
  const { isLoading, handleSubmit, register, errors, setErrors } = useForm([
    'email',
    'password',
  ]);
  const {
    isPending,
    mutate: googleLogin,
    error: googleLoginError,
  } = useMutation({
    mutationFn: requestGoogleLogin,
    onSuccess: onLogin,
  });
  const isAllLoading = isLoading || isPending;
  console.log(
    'googleLoginError',
    'name',
    googleLoginError?.name,
    'message',
    googleLoginError?.message
  );
  useEffect(() => {
    if (googleLoginError?.name !== 'common') return;
    setErrors((prev) => ({ ...prev, common: googleLoginError.message }));
  }, [googleLoginError]);

  return (
    <BasicForm title="로그인" onSubmit={handleSubmit(requestLogin, onLogin)}>
      <InputField {...register('email', validateEmail)} label="이메일" autoFocus />
      <InputField
        {...register('password', validatePassword)}
        type="password"
        label="비밀번호"
      />
      {errors.common && <FormCommonError message={errors.common} />}
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
