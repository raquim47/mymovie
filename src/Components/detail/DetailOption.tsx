import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { IMovie } from '../../services/movieApi';
import DetailOptionFavorite from './DetailOptionFavorite';
import DetailOptionRate from './DetailOptionRate';

const Option = styled.ul`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.black.middle};
  border-radius: 4px;
  padding: 10px 0;
  height: 75px;

  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 12px;
    padding: 0 4%;
  }

  li ~ li {
    position: relative;

    ::before {
      position: absolute;
      top: 50%;
      right: 100%;
      transform: translateY(-50%);
      width: 1px;
      height: 80%;
      background-color: ${(props) => props.theme.white.darker};
      content: '';
    }
  }

  .detailOptionIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    cursor: pointer;
    font-size: 24px;
  }
`;

interface IDetailOption {
  movieData: IMovie;
  toggleCommentForm: () => void;
  myRate: number;
  myComment:string;
}
function DetailOption({
  movieData,
  myRate,
  myComment,
  toggleCommentForm,
}: IDetailOption) {
  
  return (
    <Option>
      <li>
        <DetailOptionRate movieData={movieData} myRate={myRate} myComment={myComment}/>
      </li>
      <li>
        <DetailOptionFavorite movieData={movieData}/>
      </li>
      <li>
        <div className='detailOptionIcon' onClick={toggleCommentForm}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
        <em>코멘트 남기기</em>
      </li>
    </Option>
  );
}

export default DetailOption;
