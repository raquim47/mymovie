import * as S from './styles';

const ErrorMessage = ({ message }: { message: string }) => {
  return <S.ErrorMessage className='error-message'>{message}</S.ErrorMessage>;
};

export default ErrorMessage;
