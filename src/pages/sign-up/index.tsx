import AuthForm from 'components/auth-form/AuthForm';
import InputField from 'components/auth-form/InputField';
import { LinkBtn, SubmitBtn } from 'components/auth-form/styled';
import { useSignUp } from 'hooks/auth';
import { validateSignUp } from './validate';

const SignUpPage = () => {
  const { isLoading, mutate: signUp } = useSignUp();
  return (
    <AuthForm title="회원가입" submitAction={signUp} validate={validateSignUp}>
      <InputField name="email" type="email" label="이메일" />
      <InputField name="displayName" label="닉네임" />
      <InputField name="password" type="password" label="비밀번호" />
      <InputField name="confirmPassword" type="password" label="비밀번호 확인" />
      <SubmitBtn disabled={isLoading}>가입하기</SubmitBtn>
      <LinkBtn to="/login">로그인</LinkBtn>
    </AuthForm>
  );
};

export default SignUpPage;
