import { requestSignUp } from "services/auth";
import useAuthMutation from "./useAuthMutation";

const useSignUp = () => useAuthMutation(requestSignUp);

export default useSignUp