import styled from 'styled-components';
import { IVideo } from '../api';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  margin: 0 -8px;
`;

const Item = styled.div`
  position: relative;
  display: inline-block;
  width: calc(50% - 16px);
  margin: 0 8px;
  border-radius: 10px;
  overflow: hidden;

  h3 {
    font-size: 22px;
    font-weight: 500;
    color: ${(props) => props.theme.white.darker};
    margin-bottom: 12px;
  }
`;

const Caption = styled.figcaption`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  bottom: 8%;
  width: 100%;
  padding-left: 4%;
  z-index: 10;

  h4 {
    font-size: 36px;
    font-weight: 600;
    color: ${(props) => props.theme.white.white};
  }

  p {
    width: 100%;
    white-space: nowrap;
    font-size: 22px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.white.darker};
  }
`;

const Figure = styled.figure`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    object-fit: cover;
  }

  ::before {
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8));
    content: '';
  }

  :hover::before {
    background-image: linear-gradient(
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.8)
    );
  }
`;

interface IBannerProps<T> {
  bannerLeftData?: T;
  bannerRightData?: T;
}

function Banner<T extends IVideo>({
  bannerLeftData,
  bannerRightData,
}: IBannerProps<T>) {
  return (
    <Wrapper>
      <Item>
        <h3>이번 주 신작</h3>
        <Figure>
          <img
            src={makeImagePath(bannerLeftData?.backdrop_path || 'w500')}
            alt=""
          />
          <Caption>
            <h4>{bannerLeftData?.title}</h4>
            <p>{bannerLeftData?.tagline}</p>
          </Caption>
        </Figure>
      </Item>
      <Item>
        <h3>개봉 예정</h3>

        <Figure>
          <img
            src={makeImagePath(bannerRightData?.backdrop_path || 'w500')}
            alt=""
          />
          <Caption>
            <h4>{bannerRightData?.title}</h4>
            <p>{bannerRightData?.tagline}</p>
          </Caption>
        </Figure>
      </Item>
    </Wrapper>
  );
}
export default Banner;
