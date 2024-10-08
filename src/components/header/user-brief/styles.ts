import styled from 'styled-components';

export const UserBriefBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  padding: 12px;
  border-top: 1px solid ${(props) => props.theme.color.gray};
  border-bottom: 1px solid ${(props) => props.theme.color.gray};

  img {
    width: 60px;
    height: 60px;
  }
`;

export const UserInfo = styled.div`
  h4 {
    font-size: 14px;
    color: ${(props) => props.theme.color.white.dark};

    &:hover {
      color: ${(props) => props.theme.color.white.normal};
    }
  }
`;

export const UserMovieBrief = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 6px;
  font-size: 13px;

  h5 {
    font-weight: 300;
  }

  a {
    margin-left: 4px;
    text-decoration: underline;
  }
`;
