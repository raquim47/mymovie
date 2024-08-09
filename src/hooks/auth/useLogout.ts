import { useMutation } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';
import { auth } from 'utils/firebase';
// import useAuthMutation from './useAuthMutation';

const requestLogout = async () => {
  await signOut(auth);
};

const useLogout = () => useMutation({ mutationFn: requestLogout });

export default useLogout;
