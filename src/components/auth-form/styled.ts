import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

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

const btnStyles = css`
  width: 100%;
  margin-bottom: 12px;
  background-color: ${(props) => props.theme.color.gray};
  color: ${(props) => props.theme.color.white.normal};
  font-size: ${(props) => props.theme.fontSizePx.m};
  border: none;
  padding: 12px 0;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.color.purple.dark};
  }
`;

export const Btn = styled.button`
  ${btnStyles}
`;

export const SubmitBtn = styled(Btn)`
  background-color: ${(props) => props.theme.color.purple.normal};
`;

export const LinkBtn = styled(Link)`
  ${btnStyles}
  display: inline-block;
`;
