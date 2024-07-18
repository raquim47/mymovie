import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin-top: 10%;
  width: 100%;
`;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Loader() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

export default Loader;
