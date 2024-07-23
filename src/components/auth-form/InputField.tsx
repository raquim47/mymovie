import { useAuthField } from 'hooks/auth-form';
import { memo } from 'react';
import ST from './styles';
import { IInputFieldProps } from './types';

const InputField = memo(
  ({ name, placeholder, type = 'text', required = true, label }: IInputFieldProps) => {
    const { onChange, value, error } = useAuthField(name);
    return (
      <ST.Field>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={name === 'password' ? 'off' : name}
          required={required}
        />
        {error && <ST.ErrorMassage>{error}</ST.ErrorMassage>}
      </ST.Field>
    );
  }
);

export default InputField;
