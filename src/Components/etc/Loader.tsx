import styled from 'styled-components';

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
const Wrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function Loader() {
  return (
    <Wrapper>
      <Spinner></Spinner>
    </Wrapper>
  );
}

export default Loader;
