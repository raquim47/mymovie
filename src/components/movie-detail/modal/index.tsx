import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import ST from './styles';
import useLockBodyScroll from 'hooks/ui/body-scroll';
import { useAppSelector } from 'hooks/useAppSelector';

const Modal = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  useLockBodyScroll();
  const backdropPath = useAppSelector((state) => state.modalBackdrop.backdropPath);

  return (
    <ST.Overay onClick={() => navigate(backdropPath || '/')}>
      <ST.Inner onClick={(e) => e.stopPropagation()}>{children}</ST.Inner>
    </ST.Overay>
  );
};

export default Modal;
