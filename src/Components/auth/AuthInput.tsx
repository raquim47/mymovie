import styled from 'styled-components';

const InputField = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 22px;
  label {
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 500;
    color: ${(props) => props.theme.white};
  }
  input {
    height: 38px;
    padding: 0 16px;
    border: 1px solid #a6adbd;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    ::placeholder {
      color: #a6adbd;
    }
  }
  span {
    color: ${(props) => props.theme.purple};
    font-size: 12px;
    margin-top: 4px;
    margin: 4px 0 0 2px;
  }
`;

const ErrorMassage = styled.p`
  position: absolute;
  bottom: 4px;
  color: ${(props) => props.theme.purple};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

interface IAuthInput {
  label?: string;
  name: string;
  registerOptions: any;
  placeholder?: string;
  type?: string;
  errors: any;
  defaultValue?:string;
}

const AuthInput = ({
  label,
  name,
  registerOptions,
  placeholder = '',
  type = 'text',
  errors,
  defaultValue = ''
}: IAuthInput) => {
  return (
    <InputField>
      {label ? <label>
        {label}
        <span>✶</span>
      </label> : null}
      <input
        {...registerOptions}
        name={name}
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
      />
      {errors[name] && <ErrorMassage>{errors[name].message}</ErrorMassage>}
    </InputField>
  );
};
export default AuthInput;
