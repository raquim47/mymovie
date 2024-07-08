import { ReactNode } from 'react';
import { IFormData } from 'store/auth-form/types';

export type TFormValidate = (data: IFormData) => Record<string, string> | undefined;

export type TSubmitAction = (data: IFormData) => void;

export interface IAuthFormProps {
  title?: string;
  children: ReactNode;
  validate?: TFormValidate;
  submitAction: TSubmitAction;
}

export interface IInputFieldProps {
  name: keyof IFormData;
  type: 'text' | 'password' | 'email';
  placeholder?: string;
  required?: boolean;
}
