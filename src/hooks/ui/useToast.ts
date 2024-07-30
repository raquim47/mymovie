import { useDispatch } from 'react-redux';
import { addToast } from 'store/toast';

const useToast = () => {
  const dispatch = useDispatch();
  const toast = (message: string) => dispatch(addToast(message));
  return toast;
};

export default useToast;
