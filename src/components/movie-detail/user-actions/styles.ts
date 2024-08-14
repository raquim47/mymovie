import styled from 'styled-components';

export const ActionsBlock = styled.section`
  padding: 16px;
  background-color: ${(state) => state.theme.color.black.dark};
`;

export const ActionList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 -16px;
  gap: 16px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }

  & > li:nth-child(3) {
    grid-column: span 2;
    border-top: 10px solid ${(props) => props.theme.color.gray};
    padding-top: 10px;

    @media (min-width: 480px) {
      grid-column: span 1;
      padding-top: 0;
      border-top: none;
    }
  }

  li {
    text-align: center;

    & > button {
      margin: 0 auto;
      white-space: nowrap;
      height: 40px;
      font-size: 24px;

      &.heart {
        color: red;
      }
    }

    & > h4 {
      display: block;
      font-size: 13px;
      font-weight: 300;
    }

    & ~ li {
      position: relative;

      &::before {
        position: absolute;
        top: 50%;
        right: calc(100% + 8px);
        transform: translateY(-50%);
        width: 1px;
        height: 80%;
        background-color: ${(props) => props.theme.color.white.dark};
        content: '';
      }
    }
  }
`;
