import { useParams } from 'react-router-dom';
import Modal from './modal';
import Styled from './styled';
import ReactStars from 'react-stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const MovieDetail = () => {
  const { movieId } = useParams();
  console.log(movieId);

  return (
    <Modal>
      <Styled.Content>
        <Styled.Top>
          <img
            className="backdrop"
            src="https://image.tmdb.org/t/p/w1280//gRApXuxWmO2forYTuTmcz5RaNUV.jpg"
          />
          <Styled.Header>
            <Styled.Info>
              <h2>나쁜 녀석들: 라이드 오어 다이</h2>
              <h3>Bad Boys: Ride or Die</h3>
              <ul>
                <li>2024</li>
                <li>115분</li>
                <li>액션, 범죄, 스릴러, 코미디</li>
              </ul>
            </Styled.Info>
            <img className="poster" />
          </Styled.Header>
        </Styled.Top>
        <Styled.Bottom>
          <Styled.Options>
            <h3 className="sr-only">사용자 옵션</h3>
            <ul>
              <li>
                <button className="detailOptionIcon">
                  <ReactStars
                    count={5}
                    color1="#E6E6E6"
                    color2="#FFCC33"
                    half
                    size={28}
                    edit={true}
                  />
                </button>
                평가하기
              </li>
              <li>
                <button className="detailOptionIcon">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                찜하기
              </li>
              <li>
                <button className="detailOptionIcon">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                코멘트 남기기
              </li>
            </ul>
          </Styled.Options>
          <Styled.Summary>
            <h3 className="sr-only">줄거리 소개</h3>
            <h4>용의자가 된 나쁜 녀석들의 화끈한 수사가 시작된다!</h4>
            <p>
              마이애미 강력반 최고의 콤비 마이크와 마커스. 가족 같은 하워드 반장이 사망 전
              마약 카르텔 조직의 비리에 연루되었다는 뉴스 속보를 접하게 된다. 하지만
              아무도 믿지 말라는 하워드 반장의 비밀 메시지를 받은 마이크와 마커스 형사는
              사건의 진실을 밝히기 위해 위험한 수사를 시작한다. 서서히 드러나는 거대한
              음모와 마주하게 된 나쁜 녀석들. 그러나 이들 역시 함정에 빠져 사건의 용의자로
              지목되며 동료 경찰들은 물론 마약 카르텔 조직에게도 쫓기는 신세가 되고
              마는데…
            </p>
          </Styled.Summary>
        </Styled.Bottom>
      </Styled.Content>
    </Modal>
  );
};

export default MovieDetail;
