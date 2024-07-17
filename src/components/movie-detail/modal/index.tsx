import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ST from './styles';
import useLockBodyScroll from 'hooks/ui/body-scroll';
import { useAppSelector } from 'hooks/useAppSelector';

const Modal = ({ children }: { children: ReactNode }) => {
  useLockBodyScroll();
  const navigate = useNavigate();
  const backdropPath = useAppSelector((state) => state.modalBackdrop.backdropPath);
  const closeModal = () => navigate(backdropPath || '/');
  return (
    <ST.Overay onClick={closeModal}>
      <ST.Inner onClick={(e) => e.stopPropagation()}>
        <ST.CloseBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ST.CloseBtn>
        {children}
      </ST.Inner>
    </ST.Overay>
  );
};

export default Modal;
