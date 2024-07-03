import styled from 'styled-components';

export const UL = styled.ul<{ listSize: number }>`
  height: 100%;
  display: grid;
  grid-template-columns: ${({ listSize }) => `repeat(${listSize}, 1fr)`};
  gap: 1%;
`;