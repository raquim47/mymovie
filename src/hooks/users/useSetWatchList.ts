import { useAppSelector } from "hooks/useAppSelector";
import { updateWatchList } from "services/user";
import useUsersMutation from "./useUsersMutation";

const useSetWatchList = (movieId: number) => {
  const { mutate: handleClick, isLoading } = useUsersMutation(updateWatchList);

  const user = useAppSelector((state) => state.user.userData);
  const isOnWatchList = user?.watchList && user?.watchList[movieId];

  return { handleClick, isLoading, isOnWatchList };
};

export default useSetWatchList