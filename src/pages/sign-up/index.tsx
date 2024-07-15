import AuthForm from 'components/auth-form/AuthForm';
import InputField from 'components/auth-form/InputField';
import Buttons from 'components/ui/buttons';
import { useSignUp } from 'hooks/auth';
import { validateSignUp } from './validate';

const SignUpPage = () => {
  const { isLoading, mutate: signUp } = useSignUp();
  return (
    <AuthForm title="회원가입" submitAction={signUp} validate={validateSignUp}>
      <InputField name="email" type="email" label="이메일" />
      <InputField name="nickName" label="닉네임" />
      <InputField name="password" type="password" label="비밀번호" />
      <InputField name="confirmPassword" type="password" label="비밀번호 확인" />
      <Buttons.Base type="submit" accent disabled={isLoading}>
        가입하기
      </Buttons.Base>
      <Buttons.Link to="/login" className={isLoading ? 'disabled' : ''}>
        로그인
      </Buttons.Link>
    </AuthForm>
  );
};

export default SignUpPage;
