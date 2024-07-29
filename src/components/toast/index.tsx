// components/Toast.tsx
import { useAppSelector } from 'store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeToast } from 'store/toast';
import ST from './styles';

const Toast = () => {
  const dispatch = useDispatch();
  const messages = useAppSelector((state) => state.toast.messages);

  useEffect(() => {
    messages.forEach((message) => {
      const timer = setTimeout(() => {
        dispatch(removeToast(message.id));
      }, message.duration);

      return () => clearTimeout(timer);
    });
  }, [messages, dispatch]);

  return (
    <ST.Container>
      {messages.map((message) => (
        <ST.Message
          key={message.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          layoutId={message.id}
        >
          {message.description}
          <ST.CloseButton onClick={() => dispatch(removeToast(message.id))}>
            ×
          </ST.CloseButton>
          <ST.ProgressBar duration={message.duration} />
        </ST.Message>
      ))}
    </ST.Container>
  );
};

export default Toast;
