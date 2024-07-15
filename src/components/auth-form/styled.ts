import styled from 'styled-components';

export const Form = styled.form`
  margin: 0 auto;
  max-width: 450px;
  padding-top: 10px;

  h2 {
    font-size: ${(props) => props.theme.fontSizePx['xxl']};
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 22px;
  margin-bottom: 6px;

  label {
    margin-bottom: 4px;
    font-size: ${(props) => props.theme.fontSizePx.xs};
    font-weight: 500;
    color: ${(props) => props.theme.color.white.dark};
  }

  input {
    height: 38px;
    padding: 0 16px;
    border-radius: 4px;
    font-size: ${(props) => props.theme.fontSizePx.s};
    border: none;
    outline: none;

    ::placeholder {
      color: #a6adbd;
    }
  }
`;

export const ErrorMassage = styled.p`
  position: absolute;
  bottom: 4px;
  color: ${(props) => props.theme.color.purple.normal};
  font-size: ${(props) => props.theme.fontSizePx.xs};
  font-weight: 500;
  white-space: nowrap;
`;
