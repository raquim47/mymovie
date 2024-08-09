export const validateEmail = (value: string) => {
  if (!value) return '이메일을 입력하세요.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return '유효한 이메일 주소를 입력하세요.';
  return null;
};

export const validatePassword = (value: string) => {
  if (!value) return '비밀번호를 입력하세요.';
  return null;
};

export const validatePasswordForSignUp = (value: string) => {
  if (!value) return '비밀번호를 입력하세요.';
  if (value.length < 6) return '비밀번호를 6글자 이상 입력해주세요.';
  return null;
};

export const validateNickName = (value: string) => {
  if (!value) return '닉네임을 입력하세요.';
  if (value.length < 2 || value.length > 8)
    return '닉네임은 2자 이상, 8자 이하여야 합니다.';
  return null;
};

export const validatePasswordConfirm = (
  value: string,
  values: Record<string, string> = {}
) => {
  if (!value) return '비밀번호 확인을 입력하세요.';
  if (value !== values.password) return '비밀번호가 일치하지 않습니다.';
  return null;
};
