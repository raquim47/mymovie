import { memo, useRef, InputHTMLAttributes } from 'react';
import { InputRow } from './styles';

const InputField = ({
  label,
  error,
  isFocus,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error: string | null;
  isFocus?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  if (inputRef.current && error && isFocus) {
    inputRef.current.focus();
  }
  return (
    <InputRow isError={!!error}>
      <input
        {...props}
        placeholder=" "
        autoComplete={props.name === 'password' ? 'off' : props.name}
        ref={inputRef}
      />
      {label && <label htmlFor={props.name}>{label}</label>}
      {error && <span className="error">{error}</span>}
    </InputRow>
  );
};

export default memo(InputField);
