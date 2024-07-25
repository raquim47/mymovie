import { ChangeEvent } from "react";
import { updateUserImage } from "services/user";
import useUsersMutation from "./useUsersMutation";

const useSetUserImage = () => {
  const { mutate, isLoading } = useUsersMutation(updateUserImage);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      mutate(file);
      event.target.value = '';
    }
  };
  const handleRemove = () => mutate(null);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = require('assets/profile.png');
  };

  return { handleUpload, handleRemove, handleImageError, isLoading };
};

export default useSetUserImage;