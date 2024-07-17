import ST from './styles';
import { ISlideBtnsProps } from './types';

const SlideBtns = ({ onClickSlideBtn }: ISlideBtnsProps) => {
  return (
    <>
      <ST.NextBtn onClick={() => onClickSlideBtn('next')}>
        <svg
          width="8"
          height="40"
          viewBox="0 0 10 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M.524.09c-.452.226-.65.805-.44 1.295L8.015 20 .083 38.615c-.208.49-.011 1.07.44 1.295.452.226.987.012 1.196-.477L10 20 1.719.567C1.51.077.975-.136.524.09Z"
            fill="currentColor"
          />
        </svg>
      </ST.NextBtn>
      <ST.PrevBtn onClick={() => onClickSlideBtn('prev')}>
        <svg
          width="8"
          height="40"
          viewBox="0 0 10 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M9.476.09c.452.226.65.805.44 1.295L1.985 20l7.933 18.615c.208.49.011 1.07-.44 1.295-.452.226-.987.012-1.196-.477L0 20 8.281.567c.209-.49.744-.703 1.195-.477Z"
            fill="currentColor"
          />
        </svg>
      </ST.PrevBtn>
    </>
  );
};

export default SlideBtns;
