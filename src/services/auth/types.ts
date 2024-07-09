export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ISignUpCredentials extends ILoginCredentials {
  displayName: string;
  confirmPassword: string;
}

export interface IAuthErrors {
  [key: string]: Error;
}
