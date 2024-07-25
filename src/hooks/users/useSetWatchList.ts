import { useAppSelector } from "hooks/useAppSelector";
import { updateWatchList } from "services/user";
import useUsersMutation from "./useUsersMutation";

const useSetWatchList = (movieId: number) => {
  const { mutate: handleClick, isPending } = useUsersMutation(updateWatchList);

  const user = useAppSelector((state) => state.user.userData);
  const isOnWatchList = user?.watchList && user?.watchList[movieId];

  return { handleClick, isPending, isOnWatchList };
};

export default useSetWatchList