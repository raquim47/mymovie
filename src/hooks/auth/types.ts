export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ISignUpCredentials extends ILoginCredentials {
  nickName: string;
  confirmPassword: string;
}
