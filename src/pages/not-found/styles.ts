import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Content = styled.div`
  max-width: 600px;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 72px;
`;

const Subtitle = styled.h3`
  font-size: 36px;
  margin: 30px 0;
`;

const HomeButton = styled(Link)`
  padding: 10px 20px;
  background-color: ${props => props.theme.color.purple.dark};
  border-radius: 5px;
`;

export default { Container, Content, Title, Subtitle, HomeButton };
