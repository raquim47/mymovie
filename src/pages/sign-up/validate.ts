import { ISignUpCredentials } from 'services/auth/types';

export const validateSignUp = ({
  email,
  displayName,
  password,
  confirmPassword,
}: ISignUpCredentials) => {
  const errors: Record<string, string> = {};

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.email = '유효한 이메일 주소를 입력해주세요.';
  }

  if (displayName.length < 2) {
    errors.displayName = '닉네임을 두 글자 이상 입력해주세요.';
  }

  if (password.length < 6) {
    errors.password = '비밀번호를 6글자 이상 입력해주세요.';
  }

  if (password && password !== confirmPassword) {
    errors.confirmPassword = '비밀번호 확인이 일치하지 않습니다.';
  }

  return Object.keys(errors).length > 0 ? errors : undefined;
};
