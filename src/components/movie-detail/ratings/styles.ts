import styled from 'styled-components';

const Ratings = styled.section`
  padding: 16px;
  background-color: ${(state) => state.theme.color.black.dark};
`;

const Rating = styled.li`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
  gap: 14px;
  background-color: ${(state) => state.theme.color.gray};
  border-radius: 4px;
  font-size: 14px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .user-info {
    display: flex;
    flex-shrink: 0;
    gap: 10px;
    margin-top: 16px;
  }

  p {
    width: 100%;
    font-weight: 300;
  }

  @media (min-width: 768px) {
    flex-wrap: nowrap;

    .user-info {
      display: block;
      margin-top: 6px;
    }
  }
`;

export default { Ratings, Rating };
