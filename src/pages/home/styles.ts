import styled from 'styled-components';

const BannersContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 769px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SlidersContainer = styled.section`
  padding-top: 20px;
`;

const sectionTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizeVw['3xl']};
  font-weight: 500;
  @media (min-width: 769px) {
    font-size: ${(props) => props.theme.fontSizeVw.l};
  }

  @media (min-width: 961px) {
    font-size: ${(props) => props.theme.fontSizePx.l};
  }
`;

export default { BannersContainer, SlidersContainer, sectionTitle };
