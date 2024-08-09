import * as S from './styles';

const FormCommonError = ({ message }: { message: string }) => {
  return <S.ErrorMessage>{message}</S.ErrorMessage>;
};

export default FormCommonError;
