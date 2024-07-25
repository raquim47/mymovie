import { requestGoogleLogin, requestLogin } from 'services/auth';
import useAuthMutation from './useAuthMutation';

const useLogin = () => {
  const { mutate: login, isLoading: isLoginLoading } = useAuthMutation(requestLogin);
  const { mutate: googleLogin, isLoading: isGoogleLogin } =
    useAuthMutation(requestGoogleLogin);

  const isLoading = isLoginLoading || isGoogleLogin;

  return { login, googleLogin, isLoading };
};

export default useLogin;
