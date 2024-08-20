import { memo, useRef, InputHTMLAttributes } from 'react';
import ErrorMessage from '../error-message';
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
      {error && <ErrorMessage message={error} />}
    </InputRow>
  );
};

export default memo(InputField);
