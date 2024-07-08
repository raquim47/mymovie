import { useAppSelector } from 'hooks/useAppSelector';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetErrors, resetForm, setErrors, setLoading } from 'store/auth-form';
import { IFormData } from 'store/auth-form/types';
import { Form } from './styled';

const useAuthForm = ({
  validate,
  onValidSubmit,
}: {
  validate?: (data: IFormData) => Record<string, string> | undefined;
  onValidSubmit: (data: IFormData) => Promise<void>;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useAppSelector((state) => state.authForm.formData);
  const isLoading = useAppSelector((state) => state.authForm.isLoading);

  const handleErrors = (error: unknown) => {
    if (error instanceof Error) {
      const parsedError = JSON.parse(error.message);
      if (parsedError.name === 'global') {
        alert(parsedError.message);
      } else {
        dispatch(setErrors({ [parsedError.name]: parsedError.message }));
      }
    } else {
      alert('요청이 실패했습니다. 다시 시도해주세요. :' + error);
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setLoading(true));
    dispatch(resetErrors());
    const formErrors = validate && validate(formData);
    if (formErrors) {
      dispatch(setErrors(formErrors));
      dispatch(setLoading(false));
      return;
    }

    try {
      await onValidSubmit(formData);
      navigate('/');
    } catch (error) {
      handleErrors(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(resetForm());
    dispatch(resetErrors());
  }, []);

  return { onSubmit, isLoading };
};

interface IAuthForm {
  title?: string;
  children: ReactNode;
  validate?: (data: IFormData) => Record<string, string> | undefined;
  onValidSubmit: (data: IFormData) => Promise<void>;
}

const AuthForm = ({ title, validate, onValidSubmit, children }: IAuthForm) => {
  const { onSubmit, isLoading } = useAuthForm({ validate, onValidSubmit });
  return (
    <Form onSubmit={onSubmit}>
      <h2>{title}</h2>
      {/* isLoading 시에 overay로 form을 덮음, 아직 미구현 */}
      {children}
    </Form>
  );
};

export default AuthForm;
