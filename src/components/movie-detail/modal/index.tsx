import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Inner, Overay } from './styled';

const Modal = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const layoutId = params.get('layoutId');

  return (
    <AnimatePresence>
      {layoutId && (
        <Overay onClick={() => navigate('..')}>
          <Inner layoutId={layoutId} onClick={(e) => e.stopPropagation()}>
            {children}
          </Inner>
        </Overay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
