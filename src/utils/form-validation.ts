import { ERRORS } from 'utils/errors';

export const validateEmail = (value: string) => {
  if (!value) return ERRORS.EMPTY_EMAIL;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return ERRORS.INVALID_EMAIL;
  return null;
};

export const validatePassword = (value: string) => {
  if (!value) return ERRORS.EMPTY_PASSWORD;
  return null;
};

export const validatePasswordForSignUp = (value: string) => {
  if (!value) return ERRORS.EMPTY_PASSWORD;
  if (value.length < 6) return ERRORS.INVALID_PASSWORD;
  return null;
};

export const validateNickName = (value: string) => {
  if (!value) return ERRORS.EMPTY_NICKNAME;
  if (value.length < 2 || value.length > 8)
    return ERRORS.INVALID_NICKNAME;
  return null;
};

export const validatePasswordConfirm = (
  value: string,
  values: Record<string, string> = {}
) => {
  if (!value) return ERRORS.EMPTY_PASSWORD_CONFIRM;
  if (value !== values.password) return ERRORS.PASSWORD_MISMATCH;
  return null;
};
