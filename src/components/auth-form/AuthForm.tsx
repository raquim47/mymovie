import { useAuthForm } from 'hooks/auth-form';
import { useEffect } from 'react';
import { Form } from './styled';
import { IAuthFormProps } from './types';

const AuthForm = ({ title, validate, submitAction, children }: IAuthFormProps) => {
  const { handleSubmit, resetFormState } = useAuthForm();

  useEffect(() => resetFormState(), []);
  
  return (
    <Form onSubmit={(event) => handleSubmit(event, submitAction, validate)}>
      <h2>{title}</h2>
      {children}
    </Form>
  );
};

export default AuthForm;
