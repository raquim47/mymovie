import styled from 'styled-components';

const Content = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${(props) => props.theme.color.gray};
`;

export default { Content };
