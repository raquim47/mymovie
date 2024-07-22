import ST from './styles';

const MDSummary = ({ tagline, overview }: { tagline?: string; overview?: string }) => {
  return (
    <>
      {(tagline || overview) && (
        <ST.Summary>
          <h3 className="sr-only">줄거리 소개</h3>
          {tagline && <h4>{tagline}</h4>}
          <p>{overview}</p>
        </ST.Summary>
      )}
    </>
  );
};

export default MDSummary;
