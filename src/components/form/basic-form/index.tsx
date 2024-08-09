import { FormEvent, ReactNode } from 'react';
import * as S from './styles';

const BasicForm = ({
  title,
  onSubmit,
  children,
}: {
  title?: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}) => {
  return (
    <S.Form onSubmit={onSubmit}>
      {title && <S.FormTitle>{title}</S.FormTitle>}
      {children}
    </S.Form>
  );
};

export default BasicForm;
