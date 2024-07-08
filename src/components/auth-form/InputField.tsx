import { useAppSelector } from 'hooks/useAppSelector';
import { ChangeEvent, memo } from 'react';
import { useDispatch } from 'react-redux';
import { updateField } from 'store/auth-form';
import { IFormData } from 'store/auth-form/types';

interface IInputFieldProps {
  name: keyof IFormData;
  type: 'text' | 'password' | 'email';
  placeholder?: string;
}

const InputField = memo(({ name, placeholder, type = 'text' }: IInputFieldProps) => {
  const dispatch = useDispatch();
  const value = useAppSelector((state) => state.authForm.formData[name]);
  const error = useAppSelector((state) => state.authForm.errors[name]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateField({ field: name, value: e.target.value }));
  };

  return (
    <div>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
        autoComplete={name === 'password' ? 'off' : name}
      />
      {error && <p>{error}</p>}
    </div>
  );
});

export default InputField;
