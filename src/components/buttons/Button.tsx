import Styled from './styled';
import { IButtonProps } from './types';

const Button = ({ children, accent = false }: IButtonProps) => {
  return <Styled.DefaultButton accent={accent}>{children}</Styled.DefaultButton>;
};

export default Button;
