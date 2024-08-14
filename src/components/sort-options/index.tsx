import * as S from './styles';

const SortOptions = <T extends string>({
  sortOrder,
  onChange,
  options,
}: {
  sortOrder: T;
  onChange: (order: T) => void;
  options: {
    value: T;
    label: string;
  }[];
}) => {
  return (
    <S.SelectBlock>
      <label htmlFor="sort" className="sr-only">정렬 기준:</label>
      <S.Select id="sort" value={sortOrder} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </S.Select>
    </S.SelectBlock>
  );
};

export default SortOptions;
