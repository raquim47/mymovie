import { useAuthForm } from 'hooks/auth-form';
import { memo } from 'react';
import { IInputFieldProps } from './types';

const InputField = memo(
  ({ name, placeholder, type = 'text', required = true }: IInputFieldProps) => {
    const { handleInputChange, extractInputState } = useAuthForm();
    const { value, error } = extractInputState(name);
    return (
      <div>
        <input
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={handleInputChange(name)}
          autoComplete={name === 'password' ? 'off' : name}
          required={required}
        />
        {error && <p>{error}</p>}
      </div>
    );
  }
);

export default InputField;
