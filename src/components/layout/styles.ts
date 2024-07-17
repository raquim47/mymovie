import styled from 'styled-components';

const Container = styled.div`
  @media (min-width: 961px) {
    display: flex;
    max-width: 1536px;
    margin: 0 auto;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 40px 30px 0;
`;

export default { Container, Main };
