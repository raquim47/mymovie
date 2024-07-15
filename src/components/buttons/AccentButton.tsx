import { IButtonProps } from './types';
import Styled from './styled';

const AccentButton = ({ children }: IButtonProps) => {
  return <Styled.AccentButton>{children}</Styled.AccentButton>;
};

export default AccentButton;
