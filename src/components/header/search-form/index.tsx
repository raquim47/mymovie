import { FormEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

function SearchForm() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = inputRef?.current?.value;
    if (value && value.length > 1) {
      navigate(`/search?keyword=${value}`);
      inputRef.current.value = '';
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <label htmlFor="search" className="sr-only">
        검색
      </label>
      <S.Input
        id="search"
        ref={inputRef}
        placeholder="작품명을 입력해주세요..."
        minLength={2}
        required
      />
      <S.Button type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </S.Button>
    </S.Form>
  );
}

export default SearchForm;
