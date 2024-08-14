import { useAppSelector } from 'store';
import { useEffect } from 'react';
import * as S from './styles';
import useToast from 'hooks/useToast';
import { createPortal } from 'react-dom';

const Toast = () => {
  const { removeToast } = useToast();
  const messages = useAppSelector((state) => state.toast.messages);

  useEffect(() => {
    messages.forEach((message) => {
      const timer = setTimeout(() => {
        removeToast(message.id);
      }, message.duration);

      return () => clearTimeout(timer);
    });
  }, [messages, removeToast]);

  return createPortal(
    <S.ToastBlock>
      {messages.map((message) => (
        <S.MessageBlock
          key={message.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          layoutId={message.id}
        >
          {message.description}
          <S.CloseButton onClick={() => removeToast(message.id)}>×</S.CloseButton>
          <S.ProgressBar duration={message.duration} />
        </S.MessageBlock>
      ))}
    </S.ToastBlock>,
    document.getElementById('toast-root') as HTMLElement
  );
};

export default Toast;
