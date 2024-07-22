import styled from 'styled-components';

const Header = styled.header`
  position: relative;

  .backdrop {
    height: 330px;
    filter: brightness(0.7);
  }
`;

const Inner = styled.div`
  position: relative;
  margin-top: 10px;
  padding: 16px;
  background-color: ${(state) => state.theme.color.black.dark};

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 20px;
    position: absolute;
    left: 0;
    bottom: 20px;
    width: 100%;
    padding: 0 30px;
    background-color: transparent;
  }
`;

const Info = styled.div`
  color: ${(state) => state.theme.color.white.normal};

  h2 {
    font-size: 36px;
    font-weight: 700;
  }

  h3 {
    margin: 4px 0 10px;
    font-size: 20px;
  }

  ul {
    display: flex;
    gap: 30px;
  }

  li {
    position: relative;
    font-size: 14px;
    font-weight: 300;

    &.genres {
      display: flex;
      gap: 6px;
    }
  }

  li ~ li:before {
    content: '';
    position: absolute;
    right: calc(100% + 15px);
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.color.white.dark};
  }
`;

const Poster = styled.img`
  position: absolute;
  left: 50%;
  bottom: calc(100% + 50px);
  transform: translateX(-50%);
  width: 100px;
  height: 140px;
  border-radius: 4px;

  @media (min-width: 768px) {
    position: relative;
    left: 0;
    transform: translateX(0);
    width: 140px;
    height: 210px;
  }

  @media (min-width: 1024px) {
    width: 160px;
    height: 240px;
  }
`;

const ST = { Header, Inner, Info, Poster };
export default ST;
