import { FormEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Wrapper, Form } from './styled';

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
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          placeholder="작품명을 입력해주세요..."
          minLength={2}
          required
        />
        <Button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </Form>
    </Wrapper>
  );
}
export default SearchForm;
