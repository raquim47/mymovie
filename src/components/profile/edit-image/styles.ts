import styled from 'styled-components';

export const EditImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .profile-image {
    width: 100px;
    height: 100px;
    margin: 0 auto 10px;
  }

  input {
    display: none;
  }
`;