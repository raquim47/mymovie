import { TFormValidate, TSubmitAction } from 'components/auth-form/types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetErrors, resetForm, setErrors, updateField } from 'store/auth-form';
import { IFormData } from 'store/auth-form/types';
import { useAppSelector } from './useAppSelector';

export const useAuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useAppSelector((state) => state.authForm.formData);
  const errors = useAppSelector((state) => state.authForm.errors);

  const resetFormState = () => dispatch(resetForm());
  
  const handleSubmit = (
    event: React.FormEvent,
    submitAction: TSubmitAction,
    validate?: TFormValidate
  ) => {
    event.preventDefault();
    dispatch(resetErrors());

    const errors = validate && validate(formData);
    if (errors) {
      dispatch(setErrors(errors));
    } else {
      submitAction(formData);
    }
  };

  // 성공 이후 기본 실행
  const onSuccess = () => {
    navigate('/');
  };

  // 에러 이후 기본 실행
  const onError = (error: unknown) => {
    if (error instanceof Error) {
      const parsedError = JSON.parse(error.message);
      if (parsedError.name === 'global') {
        alert(parsedError.message);
      } else {
        dispatch(setErrors({ [parsedError.name]: parsedError.message }));
      }
    } else {
      alert('요청이 실패했습니다. 다시 시도해주세요.');
    }
  };

  const extractInputState = (name: keyof IFormData) => {
    return { value: formData[name], error: errors[name] };
  };

  const handleInputChange =
    (name: keyof IFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateField({ field: name, value: e.target.value }));
    };

  return {
    resetFormState,
    onSuccess,
    onError,
    handleSubmit,
    extractInputState,
    handleInputChange,
  };
};
