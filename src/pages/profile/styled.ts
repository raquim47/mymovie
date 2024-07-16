import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 30px;
  max-width: 400px;
  margin: 100px auto 0;
`;

const LeftSection = styled.section`
  width: 180px;
  padding-right: 30px;
  border-right: 1px solid ${(props) => props.theme.color.gray};
`;

const RightSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;

  .email {
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

export default {
  Container,
  LeftSection,
  RightSection,
};
