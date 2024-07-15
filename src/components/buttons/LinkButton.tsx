import Styled from './styled';
import { ILinkButtonProps } from './types';

const LinkButton = ({ children, ...props }: ILinkButtonProps) => {
  return <Styled.LinkButton {...props}>{children}</Styled.LinkButton>;
};

export default LinkButton;
