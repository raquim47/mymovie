import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ST from './styles';
import useLockBodyScroll from 'hooks/ui/body-scroll';
import { AnimatePresence } from 'framer-motion';

const Modal = ({ children }: { children: ReactNode }) => {
  useLockBodyScroll();
  const navigate = useNavigate();
  const closeModal = () => navigate('..');
  return (
    <ST.Overay onClick={closeModal}>
      <AnimatePresence>
        <ST.Inner onClick={(e) => e.stopPropagation()}>
          <ST.CloseBtn onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </ST.CloseBtn>
          {children}
        </ST.Inner>
      </AnimatePresence>
    </ST.Overay>
  );
};

export default Modal;
