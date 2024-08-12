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

  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  input {
    display: none;
  }
`;