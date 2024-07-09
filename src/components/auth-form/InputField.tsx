import { useAuthField } from 'hooks/auth-form';
import { memo } from 'react';
import { ErrorMassage, Field } from './styled';
import { IInputFieldProps } from './types';

const InputField = memo(
  ({ name, placeholder, type = 'text', required = true, label }: IInputFieldProps) => {
    const { onChange, value, error } = useAuthField(name);
    return (
      <Field>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={name === 'password' ? 'off' : name}
          // required={required}
        />
        {error && <ErrorMassage>{error}</ErrorMassage>}
      </Field>
    );
  }
);

export default InputField;
