import { ILoginCredentials } from "hooks/auth/types";

export const validateLogin = ({ email, password }: ILoginCredentials) => {
  const errors: Record<string, string> = {};

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.email = '유효한 이메일 주소를 입력해주세요.';
  }
  if (!password) {
    errors.password = '비밀번호를 입력해주세요.';
  }

  return Object.keys(errors).length > 0 ? errors : undefined;
};