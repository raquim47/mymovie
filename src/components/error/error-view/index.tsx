import * as S from './styles';

const ErrorView = ({
  code,
  message,
  to,
}: {
  code?: number;
  message: string;
  to?: string;
}) => {
  return (
    <S.ErrorPanelBlock>
      <S.ContentBlock>
        {code && <S.ErrorCode>{code}</S.ErrorCode>}
        <S.TitleMessage>{message}</S.TitleMessage>
        {to && <S.Link to={to}>Home</S.Link>}
      </S.ContentBlock>
    </S.ErrorPanelBlock>
  );
};

export default ErrorView;
