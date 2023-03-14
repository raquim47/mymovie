import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

interface IForm {
  keyword: string;
}

const Form = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 20px;
`;

const Input = styled(motion.input)`
  width: 100%;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  background-color: ${(props) => props.theme.gray};

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
    -webkit-transition-delay: 9999s;
  }
`;

const Button = styled(motion.button)`
  color: ${(props) => props.theme.white.darker};
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.white.white};
  }
`;

function SearchForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();

  const onValid = (data: IForm) => {
    console.log(data);
    navigate(`/search?keyword=${data.keyword}`);
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register('keyword', { required: true, minLength: 2 })}
        placeholder="작품명을 입력해주세요..."
      />
      <Button>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </Form>
  );
}
export default SearchForm;
