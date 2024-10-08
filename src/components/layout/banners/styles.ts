import styled from "styled-components";

export const BannersContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 769px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Title = styled.h3`
  font-size: 32px;
  font-weight: 500;

  @media (min-width: 769px) {
    font-size: 20px;
  }
`;