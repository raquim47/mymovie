import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

export const ErrorPanelBlock = styled.div`
  display: flex;
  height: 100%;
  min-height: inherit;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ContentBlock = styled.div`
  max-width: 600px;
  padding: 20px;
`;

export const ErrorCode = styled.strong`
  font-size: 68px;
`;

export const TitleMessage = styled.h2`
  font-size: 36px;
  margin: 20px 0 30px;
`;

export const Link = styled(RouterLink)`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.color.purple.dark};
  border-radius: 5px;
`;
