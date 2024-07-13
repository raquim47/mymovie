export interface IFormData {
  email: string;
  nickName: string;
  password: string;
  confirmPassword: string;
}

export interface IFormState {
  formData: IFormData;
  errors: { [K in keyof IFormData]: string };
}
