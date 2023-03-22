import styled from 'styled-components';

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  height: 90px;
  label {
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.white};
  }
  input {
    height: 44px;
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
    font-size: 16px;
    margin-top: 4px;
    margin: 4px 0 0 2px;
  }
`;

const ErrorMassage = styled.p`
  margin-top: 4px;
  color: ${(props) => props.theme.purple};
  font-size: 12px;
  font-weight: 700;
`;

interface IAuthInput {
  label: string;
  name: string;
  registerOptions: any;
  placeholder?: string;
  type?: string;
  errors: any;
}

const AuthInput = ({
  label,
  name,
  registerOptions,
  placeholder = '',
  type = 'text',
  errors,
}: IAuthInput) => {
  return (
    <InputField>
      <label>
        {label}
        <span>✶</span>
      </label>
      <input
        {...registerOptions}
        name={name}
        placeholder={placeholder}
        type={type}
        onBlur={registerOptions.onBlur}
      />
      {errors[name] && <ErrorMassage>{errors[name].message}</ErrorMassage>}
    </InputField>
  );
};
export default AuthInput;
