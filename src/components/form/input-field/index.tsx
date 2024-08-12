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
        id={props.name}
        placeholder=" "
        autoComplete={props.type === 'password' ? 'off' : props.name?.toLowerCase()}
        ref={inputRef}
      />
      {label && <label htmlFor={props.name}>{label}</label>}
      {error && <span className="error">{error}</span>}
    </InputRow>
  );
};

export default memo(InputField);
