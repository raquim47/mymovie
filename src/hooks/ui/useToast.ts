import { useDispatch } from 'react-redux';
import { addToast, removeToast } from 'store/toast';

const useToast = () => {
  const dispatch = useDispatch();
  return {
    addToast: (message: string) => dispatch(addToast(message)),
    removeToast: (id: string) => dispatch(removeToast(id)),
  };
};

export default useToast;
