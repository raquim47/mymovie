import { useAppSelector } from 'store';
import * as S from './styles';
import { createPortal } from 'react-dom';
import ToastMessage from './message';
import { motion } from 'framer-motion';
import useToast from 'hooks/useToast';
import { useLocation, useNavigate } from 'react-router-dom';
const Toast = () => {
  const messages = useAppSelector((state) => state.toast.messages);

  return createPortal(
    <S.ToastBlock>
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          layoutId={message.id}
        >
          <ToastMessage message={message} />
        </motion.div>
      ))}
    </S.ToastBlock>,
    document.getElementById('toast-root') as HTMLElement
  );
};

export default Toast;
