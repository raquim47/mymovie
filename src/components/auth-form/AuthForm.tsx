import { useAuthForm } from 'hooks/auth-form';
import ST from './styles';
import { IAuthFormProps } from './types';

const AuthForm = ({ title, validate, submitAction, children }: IAuthFormProps) => {
  const { handleSubmit } = useAuthForm();

  return (
    <ST.Form onSubmit={(event) => handleSubmit(event, submitAction, validate)}>
      <h2>{title}</h2>
      {children}
    </ST.Form>
  );
};

export default AuthForm;
