import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inner, Overay } from './styled';

const Modal = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <Overay onClick={() => navigate('..')}>
      <Inner onClick={(e) => e.stopPropagation()}>{children}</Inner>
    </Overay>
  );
};

export default Modal;
