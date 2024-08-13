import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import * as S from './styles';
import { AnimatePresence } from 'framer-motion';

const Modal = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const navigate = useNavigate();
  const { search } = useLocation();
  const closeModal = () => navigate('..' + (search || ''));
  return (
    <S.Overay onClick={closeModal}>
      <AnimatePresence>
        <S.Inner onClick={(e) => e.stopPropagation()}>
          <S.CloseBtn onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </S.CloseBtn>
          {children}
        </S.Inner>
      </AnimatePresence>
    </S.Overay>
  );
};

export default Modal;
