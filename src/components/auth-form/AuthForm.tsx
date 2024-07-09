import { useAuthForm } from 'hooks/auth-form';
import { Form } from './styled';
import { IAuthFormProps } from './types';

const AuthForm = ({ title, validate, submitAction, children }: IAuthFormProps) => {
  const { handleSubmit } = useAuthForm();

  return (
    <Form onSubmit={(event) => handleSubmit(event, submitAction, validate)}>
      <h2>{title}</h2>
      {children}
    </Form>
  );
};

export default AuthForm;
