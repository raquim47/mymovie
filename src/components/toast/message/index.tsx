import { memo, useEffect } from 'react';
import * as S from './styles';
import useToast from 'hooks/useToast';
import { IToastMessage } from 'store/toast/types';

const ToastMessage = memo(
  ({ message: { id, duration, description } }: { message: IToastMessage }) => {
    const { removeToast } = useToast();

    useEffect(() => {
      const timer = setTimeout(() => {
        removeToast(id);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }, [id, duration, removeToast]);

    return (
      <S.MessageBlock>
        {description}
        <S.CloseButton onClick={() => removeToast(id)}>×</S.CloseButton>
        <S.ProgressBar duration={duration} />
      </S.MessageBlock>
    );
  }
);

export default ToastMessage;
