import BasicForm from 'components/form/basic-form';
import FormCommonError from 'components/form/common-error';
import InputField from 'components/form/input-field';
import Buttons from 'components/ui/buttons';
import useAuthSuccess from 'hooks/auth/useAuthSuccess';
import useForm from 'hooks/ui/useForm';
import { requestSignUp } from 'services/auth';
import {
  validateEmail,
  validateNickName,
  validatePasswordConfirm,
  validatePasswordForSignUp,
} from 'utils/form-validation';
import PATH from 'utils/path';

const SignUpPage = () => {
  const onAuthSuccess = useAuthSuccess();
  const { isLoading, handleSubmit, register, errors, errorFocus } = useForm([
    'email',
    'nickName',
    'password',
    'passwordConfirm',
  ]);
  return (
    <BasicForm title="회원가입" onSubmit={handleSubmit(requestSignUp, onAuthSuccess)}>
      <InputField
        {...register('email', validateEmail)}
        error={errors.email}
        label="이메일"
        isFocus={errorFocus === 'email'}
        autoFocus
      />
      <InputField
        {...register('nickName', validateNickName)}
        error={errors.nickName}
        label="닉네임"
        isFocus={errorFocus === 'nickName'}
      />
      <InputField
        {...register('password', validatePasswordForSignUp)}
        error={errors.password}
        type="password"
        label="비밀번호"
        isFocus={errorFocus === 'password'}
      />
      <InputField
        {...register('passwordConfirm', validatePasswordConfirm)}
        error={errors.passwordConfirm}
        type="password"
        label="비밀번호 확인"
        isFocus={errorFocus === 'passwordConfirm'}
      />
      {errors.common && <FormCommonError message={errors.common} />}
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
