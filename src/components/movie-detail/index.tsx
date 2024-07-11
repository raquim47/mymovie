import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Modal from './modal';

const Child = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
`;

const MovieDetail = () => {
  const { movieId } = useParams();
  console.log(movieId);
  return (
    <Modal>
      <Child />
    </Modal>
  );
};

export default MovieDetail;
