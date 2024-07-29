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

const SectionTitle = styled.h3`
  font-size: 32px;
  font-weight: 500;

  @media (min-width: 769px) {
    font-size: 20px;
  }
`;

export default { BannersContainer, SlidersContainer, SectionTitle };
