import BasicForm from 'components/form/basic-form';
import FormCommonError from 'components/form/common-error';
import InputField from 'components/form/input-field';
import Buttons from 'components/ui/buttons';
import { requestSignUp } from 'hooks/auth/useLoginSuccess';
import useLoginSuccess from 'hooks/auth/useOnLoginSuccess';
import useForm from 'hooks/ui/useForm';
import {
  validateEmail,
  validateNickName,
  validatePasswordConfirm,
  validatePasswordForSignUp,
} from 'utils/form-validation';
import PATH from 'utils/path';

const SignUpPage = () => {
  const onLogin = useLoginSuccess();
  const { isLoading, handleSubmit, register, errors } = useForm([
    'email',
    'nickName',
    'password',
    'passwordConfirm',
  ]);
  return (
    <BasicForm title="회원가입" onSubmit={handleSubmit(requestSignUp, onLogin)}>
      <InputField {...register('email', validateEmail)} label="이메일" autoFocus />
      <InputField {...register('nickName', validateNickName)} label="닉네임" />
      <InputField
        {...register('password', validatePasswordForSignUp)}
        type="password"
        label="비밀번호"
      />
      <InputField
        {...register('passwordConfirm', validatePasswordConfirm)}
        type="password"
        label="비밀번호 확인"
      />
      {errors.form && <FormCommonError message={errors.form} />}
      <Buttons.Base type="submit" accent disabled={isLoading}>
        가입하기
      </Buttons.Base>
      <Buttons.Link to={PATH.LOGIN} disabled={isLoading}>
        로그인
      </Buttons.Link>
    </BasicForm>
  );
};

export default SignUpPage;
