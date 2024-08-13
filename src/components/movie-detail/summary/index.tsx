import * as S from './styles';

const MDSummary = ({ tagline, overview }: { tagline?: string; overview?: string }) => {
  return (
    <>
      {(tagline || overview) && (
        <S.SummaryBlock>
          <h3 className="sr-only">줄거리 소개</h3>
          {tagline && <h4>{tagline}</h4>}
          <p>{overview}</p>
        </S.SummaryBlock>
      )}
    </>
  );
};

export default MDSummary;
