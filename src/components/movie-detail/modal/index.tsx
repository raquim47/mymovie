import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inner, Overay } from './styled';
import useLockBodyScroll from 'hooks/useLockBodyScroll';
import { useAppSelector } from 'hooks/useAppSelector';

const Modal = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  useLockBodyScroll();
  const backdropPath = useAppSelector((state) => state.modalBackdrop.backdropPath);

  return (
    <Overay onClick={() => navigate(backdropPath || '/')}>
      <Inner onClick={(e) => e.stopPropagation()}>{children}</Inner>
    </Overay>
  );
};

export default Modal;
