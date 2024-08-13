import styled from 'styled-components';

export const NextBtn = styled.button`
  position: absolute;
  left: calc(100% + 4px);
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0);
  color: white;
  right: auto;
  opacity: 0;

  :hover {
    filter: brightness(1.5);
  }
`;

export const PrevBtn = styled(NextBtn)`
  left: auto;
  right: calc(100% + 4px);
`;
