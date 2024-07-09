import { TFormValidate, TSubmitAction } from 'components/auth-form/types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetErrors, resetForm, setErrors, updateField } from 'store/auth-form';
import { IFormData } from 'store/auth-form/types';
import { useAppSelector } from './useAppSelector';

export const useAuthForm = () => {
  const dispatch = useDispatch();
  const formData = useAppSelector((state) => state.authForm.formData);

  useEffect(() => {
    dispatch(resetForm());
  }, []);

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

  return { handleSubmit };
};

export const useAuthField = (name: keyof IFormData) => {
  const dispatch = useDispatch();
  const value = useAppSelector((state) => state.authForm.formData[name]);
  const error = useAppSelector((state) => state.authForm.errors[name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setErrors({ [name]: '' }));
    dispatch(updateField({ field: name, value: e.target.value }));
  };

  return { value, error, onChange: handleInputChange };
};
