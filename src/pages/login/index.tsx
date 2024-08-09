import BasicForm from 'components/form/basic-form';
import InputField from 'components/form/input-field';
import Buttons from 'components/ui/buttons';
import FormCommonError from 'components/form/common-error';
import { requestLogin } from 'hooks/auth/useLoginSuccess';
import useForm from 'hooks/ui/useForm';
import { validateEmail, validatePassword } from 'utils/form-validation';
import PATH from 'utils/path';
import useLoginSuccess from 'hooks/auth/useOnLoginSuccess';

const LoginPage = () => {
  const onLogin = useLoginSuccess();
  const { isLoading, handleSubmit, register, commonError } = useForm([
    'email',
    'password',
  ]);
  return (
    <BasicForm title="로그인" onSubmit={handleSubmit(requestLogin, onLogin)}>
      <InputField {...register('email', validateEmail)} label="이메일" autoFocus />
      <InputField
        {...register('password', validatePassword)}
        type="password"
        label="비밀번호"
      />
      {commonError && <FormCommonError message={commonError} />}
      <Buttons.Base accent type="submit" disabled={isLoading}>
        로그인
      </Buttons.Base>
      <Buttons.Link to={PATH.SIGNUP} disabled={isLoading}>
        회원가입
      </Buttons.Link>
    </BasicForm>
  );
};

export default LoginPage;
