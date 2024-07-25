import { requestGoogleLogin, requestLogin } from 'services/auth';
import useAuthMutation from './useAuthMutation';

const useLogin = () => {
  const { mutate: login, isPending: isLoginPending } = useAuthMutation(requestLogin);
  const { mutate: googleLogin, isPending: isGoogleLoginPending } =
    useAuthMutation(requestGoogleLogin);

  const isPending = isLoginPending || isGoogleLoginPending;

  return { login, googleLogin, isPending };
};

export default useLogin;
